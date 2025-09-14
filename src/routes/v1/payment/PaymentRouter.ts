import { Router } from 'express';
import IPaymentController from '../../../controllers/payment/interface/IPaymentController';

const createPayemntRouter = function(paymentController: IPaymentController): Router {
    const router = Router();

    router.post('/initiate', paymentController.initiatePayment.bind(paymentController));

    return router;
};

export default createPayemntRouter;