import BaseRepository from '../../base/implementation/BaseRepository';
import IBaseRepository from '../../base/interface/IBaseRepository';
import IPaymentRepository from '../interface/IPaymentRepository';
import IPaymentDocument from '../../../models/payments/interfaces/IPayment';
import { PaymentModel } from '../../../models/payments/model/payment.model';

export default class PaymentRepository implements IPaymentRepository {
    private paymentBaseRepo: IBaseRepository<IPaymentDocument> = new BaseRepository<IPaymentDocument>(PaymentModel);

    async createPayment(paymentData: Partial<IPaymentDocument>): Promise<IPaymentDocument> {
        try {
            const result = await this.paymentBaseRepo.create(paymentData);
            return result;
        } catch (error) {
            throw new Error(`Failed to create an payment history: ${(error as Error).message}`);
        }
    }
}