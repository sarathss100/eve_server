import IPaymentDocument from "../../../models/payments/interfaces/IPayment";

export default interface IPaymentRepository {
    createPayment(paymentData: Partial<IPaymentDocument>): Promise<IPaymentDocument>;
}