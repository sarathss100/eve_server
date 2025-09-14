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
const AppError_1 = require("../../../error/AppError");
const PaymentMapper_1 = __importDefault(require("../../../mappers/payment/PaymentMapper"));
const RedisService_1 = __importDefault(require("../../redis/RedisService"));
const tokenUtils_1 = require("../../../utils/tokenUtils");
const stripe_1 = __importDefault(require("stripe"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-06-30.basil' });
class PaymentService {
    constructor(paymentRepository) {
        this._paymentRepository = paymentRepository;
    }
    createPayment(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mappedData = PaymentMapper_1.default.toModel(paymentData);
                const result = yield this._paymentRepository.createPayment(mappedData);
                const paymentDetails = PaymentMapper_1.default.toIPaymentDTO(result);
                return paymentDetails;
            }
            catch (error) {
                throw (0, AppError_1.wrapServiceError)(error);
            }
        });
    }
    initiatePayment(accessToken, paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const userId = (0, tokenUtils_1.extractUserIdFromToken)(accessToken);
                // Check Redis if session exists for user
                const existingSessionId = yield RedisService_1.default.getUserStripeSession(userId);
                if (existingSessionId) {
                    try {
                        const session = yield stripe.checkout.sessions.retrieve(existingSessionId);
                        if (session && session.url) {
                            return { checkOutUrl: session.url, session_id: session.id };
                        }
                    }
                    catch (error) {
                        console.warn(`Failed to retrieve existing session ${existingSessionId}:`, error);
                        // Remove invalid session from Redis
                        yield RedisService_1.default.removeUserStripeSession(userId);
                    }
                }
                // Validate amount
                const amount = paymentData.amount || 100;
                if (amount <= 0) {
                    throw new Error('Payment amount must be greater than 0');
                }
                // Create a Stripe Checkout Session with enhanced configuration
                const session = yield stripe.checkout.sessions.create({
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
                        user_id: ((_a = paymentData.user_id) === null || _a === void 0 ? void 0 : _a.toString()) || '',
                        event_id: ((_b = paymentData.event_id) === null || _b === void 0 ? void 0 : _b.toString()) || '',
                        amount: amount.toString()
                    },
                    success_url: `${process.env.FROND_END_URL}/`,
                    cancel_url: `${process.env.FROND_END_URL}/`,
                    client_reference_id: userId,
                    payment_intent_data: {
                        capture_method: 'automatic',
                        setup_future_usage: undefined,
                        metadata: {
                            user_id: ((_c = paymentData.user_id) === null || _c === void 0 ? void 0 : _c.toString()) || '',
                            event_id: ((_d = paymentData.event_id) === null || _d === void 0 ? void 0 : _d.toString()) || '',
                            amount: amount.toString()
                        }
                    },
                    expires_at: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours from now
                });
                if (!session.url) {
                    throw new Error('Failed to create Stripe session URL');
                }
                yield RedisService_1.default.saveUserStripeSession(userId, session.id);
                return { checkOutUrl: session.url, session_id: session.id };
            }
            catch (error) {
                console.error('Error in initiatePayment:', error);
                throw (0, AppError_1.wrapServiceError)(error);
            }
        });
    }
}
exports.default = PaymentService;
