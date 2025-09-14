import { Request, Response } from 'express';
import { sendSuccessResponse } from '../../../utils/responseHandler';
import { StatusCodes } from '../../../constants/statusCodes'; 
import { SuccessMessages } from '../../../constants/successMessages'; 
import { handleControllerError } from '../../../error/AppError'; 
import IPaymentController from '../interface/IPaymentController';
import IPaymentService from '../../../services/payments/interface/IPaymentService';

export default class PaymentController implements IPaymentController {
    private readonly _paymentService: IPaymentService;

    constructor(paymentService: IPaymentService) {
        this._paymentService = paymentService;
    }

    async initiatePayment(request: Request, response: Response): Promise<void> {
        try {
            const { accessToken } = request.cookies;
            
            const paymentData = request.body;

            const checkoutUrl = await this._paymentService.initiatePayment(accessToken, paymentData);

            sendSuccessResponse(response, StatusCodes.CREATED, SuccessMessages.OPERATION_SUCCESS, { ...checkoutUrl });
        } catch (error) {
            handleControllerError(response, error);
        }
    }
}