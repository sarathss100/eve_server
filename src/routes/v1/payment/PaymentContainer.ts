import IPaymentController from '../../../controllers/payment/interface/IPaymentController';
import PaymentRepository from '../../../repositories/payments/implementation/PaymentRepository';
import PaymentService from '../../../services/payments/implementation/PaymentService';
import PaymentController from '../../../controllers/payment/implementation/PaymentController';
import createPayemntRouter from './PaymentRouter';

class PaymentContainer {
    public readonly controller: IPaymentController;
    public readonly router: ReturnType<typeof createPayemntRouter>;

    constructor() {
        const repository = new PaymentRepository();
        const service = new PaymentService(repository);
        this.controller = new PaymentController(service);
        this.router = createPayemntRouter(this.controller);
    }
}

export default PaymentContainer;