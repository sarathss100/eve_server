"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler_1 = require("../../utils/responseHandler");
const statusCodes_1 = require("../../constants/statusCodes");
const errorMessages_1 = require("../../constants/errorMessages");
const successMessages_1 = require("../../constants/successMessages");
const stripe_1 = __importDefault(require("stripe"));
const PaymentRepository_1 = __importDefault(require("../../repositories/payments/implementation/PaymentRepository"));
const PaymentMapper_1 = __importDefault(require("../../mappers/payment/PaymentMapper"));
const RedisService_1 = __importDefault(require("../../services/redis/RedisService"));
const TicketRepository_1 = __importDefault(require("../../repositories/tickets/implementation/TicketRepository"));
const TicketMapper_1 = __importDefault(require("../../mappers/ticket/TicketMapper"));
const EventRepository_1 = __importDefault(require("../../repositories/events/implementation/EventRepository"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-06-30.basil' });
const paymentRepository = new PaymentRepository_1.default();
const ticketRepository = new TicketRepository_1.default();
const eventRepository = new EventRepository_1.default();
class WebhookController {
    stripeWebhook(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const sig = request.headers['stripe-signature'];
            let event;
            try {
                event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
            }
            catch (error) {
                console.error(`Webhook error: ${error.message}`);
                (0, responseHandler_1.sendErrorResponse)(response, statusCodes_1.StatusCodes.BAD_REQUEST, errorMessages_1.ErrorMessages.INTERNAL_SERVER_ERROR);
                return;
            }
            const session = event.data.object;
            const userId = ((_a = session.metadata) === null || _a === void 0 ? void 0 : _a.userId) || '';
            try {
                switch (event.type) {
                    case 'checkout.session.completed': {
                        const paymentIntentId = session.payment_intent;
                        const paymentIntent = yield stripe.paymentIntents.retrieve(paymentIntentId);
                        const amount = ((_b = paymentIntent.amount_received) !== null && _b !== void 0 ? _b : 0) / 100;
                        const ticketData = {
                            event_id: ((_c = session.metadata) === null || _c === void 0 ? void 0 : _c.event_id) || '',
                            user_id: ((_d = paymentIntent.metadata) === null || _d === void 0 ? void 0 : _d.user_id) || '',
                            session_id: session.id,
                            amount: amount,
                            ticket_status: paymentIntent.status === 'succeeded' ? 'confirmed' : 'cancelled',
                            puchased_date: new Date(),
                        };
                        const mappedTicketModel = TicketMapper_1.default.toModel(ticketData);
                        const ticketDetails = yield ticketRepository.generateTicket(mappedTicketModel);
                        const paymentData = {
                            payment_id: session.id,
                            ticket_id: ticketDetails.id.toString(),
                            amount: amount,
                            payment_status: paymentIntent.status === 'succeeded' ? 'paid' : 'pending',
                            payment_method: 'online',
                        };
                        const mappedModel = PaymentMapper_1.default.toModel(paymentData);
                        yield paymentRepository.createPayment(mappedModel);
                        yield eventRepository.reduceTicketCount(((_e = session.metadata) === null || _e === void 0 ? void 0 : _e.event_id) || '');
                        yield RedisService_1.default.removeUserStripeSession(userId);
                        break;
                    }
                    case 'checkout.session.expired': {
                        if (userId) {
                            yield RedisService_1.default.removeUserStripeSession(userId);
                            console.log(`Stripe session expired, removed Redis key for user ${userId}`);
                        }
                        break;
                    }
                    default:
                        console.log(`Unhandled Stripe event type: ${event.type}`);
                }
            }
            catch (processingError) {
                console.error(`Error processing webhook event:`, processingError);
                (0, responseHandler_1.sendErrorResponse)(response, statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, errorMessages_1.ErrorMessages.INTERNAL_SERVER_ERROR);
                return;
            }
            (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.ACCEPTED, successMessages_1.SuccessMessages.OPERATION_SUCCESS, { received: true });
        });
    }
}
exports.default = WebhookController;
