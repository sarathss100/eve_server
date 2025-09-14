import { Request, Response } from "express";

interface IPaymentController {
    initiatePayment(request: Request, response: Response): Promise<void>;
}

export default IPaymentController;