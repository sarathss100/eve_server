import { wrapServiceError } from '../../../error/AppError'; 
import IPaymentService from '../interface/IPaymentService';
import IPaymentRepository from '../../../repositories/payments/interface/IPaymentRepository';
import IPaymentDTO from '../../../dtos/payment/IPaymentDTO';
import PaymentMapper from '../../../mappers/payment/PaymentMapper';
import RedisService from '../../redis/RedisService';
import { extractUserIdFromToken } from '../../../utils/tokenUtils';
import Stripe from 'stripe';
import IStripeResponseDTO from '../../../dtos/payment/IStripeResponseDTO';
import IStripeRequestDTO from '../../../dtos/payment/IStripeRequestDTO';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-06-30.basil' as any });

export default class PaymentService implements IPaymentService {
    private _paymentRepository: IPaymentRepository;
    constructor(paymentRepository: IPaymentRepository) {
        this._paymentRepository = paymentRepository;
    }

    async createPayment(paymentData: Partial<IPaymentDTO>): Promise<IPaymentDTO> {
        try {
            const mappedData = PaymentMapper.toModel(paymentData);

            const result = await this._paymentRepository.createPayment(mappedData);

            const paymentDetails = PaymentMapper.toIPaymentDTO(result);

            return paymentDetails;
        } catch (error) {
            throw wrapServiceError(error);
        }
    }

    async initiatePayment(accessToken: string, paymentData: Partial<IStripeRequestDTO>): Promise<IStripeResponseDTO> {
    try {
        const userId = extractUserIdFromToken(accessToken);

        // Check Redis if session exists for user
        const existingSessionId = await RedisService.getUserStripeSession(userId);

        if (existingSessionId) {
            try {
                const session = await stripe.checkout.sessions.retrieve(existingSessionId);
                if (session && session.url) {
                    return { checkOutUrl: session.url, session_id: session.id };
                }
            } catch (error) {
                console.warn(`Failed to retrieve existing session ${existingSessionId}:`, error);
                // Remove invalid session from Redis
                await RedisService.removeUserStripeSession(userId);
            }
        }

        // Validate amount
        const amount = paymentData.amount || 100;
        if (amount <= 0) {
            throw new Error('Payment amount must be greater than 0');
        }

        // Create a Stripe Checkout Session with enhanced configuration
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Event Ticket`,
                            description: `Ticket for Event ID: ${paymentData.event_id || 'N/A'}`
                        },
                        unit_amount: Math.round(amount * 100), 
                    }, 
                    quantity: 1,
                }
            ],
            metadata: { 
                user_id: paymentData.user_id?.toString() || '',
                event_id: paymentData.event_id?.toString() || '',
                amount: amount.toString()
            },
            success_url: `${process.env.FROND_END_URL}/`,
            cancel_url: `${process.env.FROND_END_URL}/`,
            client_reference_id: userId,
            
            payment_intent_data: {
                capture_method: 'automatic',
                setup_future_usage: undefined,
                metadata: {
                    user_id: paymentData.user_id?.toString() || '',
                    event_id: paymentData.event_id?.toString() || '',
                    amount: amount.toString()
                }
            },
           
            expires_at: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours from now
        });

        if (!session.url) {
            throw new Error('Failed to create Stripe session URL');
        }

        await RedisService.saveUserStripeSession(userId, session.id);

        return { checkOutUrl: session.url, session_id: session.id };
    } catch (error) {
        console.error('Error in initiatePayment:', error);
        throw wrapServiceError(error);
    }
}
}