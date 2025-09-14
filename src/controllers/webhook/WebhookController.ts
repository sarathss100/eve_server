import { Request, Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from '../../utils/responseHandler';
import { StatusCodes } from '../../constants/statusCodes';
import { ErrorMessages } from '../../constants/errorMessages';
import { SuccessMessages } from '../../constants/successMessages';
import Stripe from 'stripe';
import IPaymentRepository from '../../repositories/payments/interface/IPaymentRepository';
import PaymentRepository from '../../repositories/payments/implementation/PaymentRepository';
import PaymentMapper from '../../mappers/payment/PaymentMapper';
import RedisService from '../../services/redis/RedisService';
import ITicketRepository from '../../repositories/tickets/interface/ITicketRepository';
import TicketRepository from '../../repositories/tickets/implementation/TicketRepository';
import TicketMapper from '../../mappers/ticket/TicketMapper';
import IEventRepository from '../../repositories/events/interface/IEventRepository';
import EventRepository from '../../repositories/events/implementation/EventRepository';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-06-30.basil' as any });
const paymentRepository: IPaymentRepository = new PaymentRepository();
const ticketRepository: ITicketRepository = new TicketRepository();
const eventRepository: IEventRepository = new EventRepository();

export default class WebhookController {
    async stripeWebhook(request: Request, response: Response): Promise<void> {
        const sig = request.headers['stripe-signature'] as string;
        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
        } catch (error) {
            console.error(`Webhook error: ${(error as Error).message}`);
            sendErrorResponse(response, StatusCodes.BAD_REQUEST, ErrorMessages.INTERNAL_SERVER_ERROR);
            return;
        }

        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId || '';

        try {
            switch (event.type) {
                case 'checkout.session.completed': {
                    const paymentIntentId = session.payment_intent as string;

                    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

                    const amount = (paymentIntent.amount_received ?? 0) / 100;
                    
                    const ticketData = {
                        event_id: session.metadata?.event_id || '',
                        user_id: paymentIntent.metadata?.user_id || '',
                        session_id: session.id,
                        amount: amount,
                        ticket_status: paymentIntent.status === 'succeeded' ? 'confirmed' as 'confirmed' | 'cancelled' : 'cancelled' as 'confirmed' | 'cancelled',
                        puchased_date: new Date(),
                    }

                    const mappedTicketModel = TicketMapper.toModel(ticketData);
                    const ticketDetails = await ticketRepository.generateTicket(mappedTicketModel);

                    const paymentData = {
                        payment_id: session.id,
                        ticket_id: ticketDetails.id.toString(),
                        amount: amount,
                        payment_status: paymentIntent.status === 'succeeded' ? 'paid' as 'paid' | 'pending' | 'refunded' : 'pending' as 'paid' | 'pending' | 'refunded',
                        payment_method: 'online' as 'online' | 'offline' | undefined,
                    };

                    const mappedModel = PaymentMapper.toModel(paymentData);
                    await paymentRepository.createPayment(mappedModel);

                    await eventRepository.reduceTicketCount(session.metadata?.event_id || '');

                    await RedisService.removeUserStripeSession(userId);
                    break;
                }

                case 'checkout.session.expired': {
                    if (userId) {
                        await RedisService.removeUserStripeSession(userId);
                        console.log(`Stripe session expired, removed Redis key for user ${userId}`);
                    }
                    break;
                }

                default:
                    console.log(`Unhandled Stripe event type: ${event.type}`);
            }
        } catch (processingError) {
            console.error(`Error processing webhook event:`, processingError);
            sendErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.INTERNAL_SERVER_ERROR);
            return;
        }

        sendSuccessResponse(response, StatusCodes.ACCEPTED, SuccessMessages.OPERATION_SUCCESS, { received: true });
    }
}
