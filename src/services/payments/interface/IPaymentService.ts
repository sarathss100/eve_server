import IPaymentDTO from "../../../dtos/payment/IPaymentDTO";
import IStripeRequestDTO from "../../../dtos/payment/IStripeRequestDTO";
import IStripeResponseDTO from "../../../dtos/payment/IStripeResponseDTO";

export default interface IPaymentService {
    initiatePayment(accessToken: string, paymentData: Partial<IStripeRequestDTO>): Promise<IStripeResponseDTO>;
    createPayment(paymentData: Partial<IPaymentDTO>): Promise<IPaymentDTO>;
}