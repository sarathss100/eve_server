import { Request, Response } from 'express';
import { StatusCodes } from "../../../constants/statusCodes";
import { SuccessMessages } from "../../../constants/successMessages";
import { handleControllerError } from "../../../error/AppError";
import { sendSuccessResponse } from "../../../utils/responseHandler";
import ITicketService from '../../../services/tickets/interface/ITicketService';
import ITicketController from '../interface/ITicketController';

export default class TicketController implements ITicketController {
    private readonly _ticketService: ITicketService;

    constructor(ticketService: ITicketService) {
        this._ticketService = ticketService;
    }

    async generateTicket(request: Request, response: Response): Promise<void> {
        try {
            const { formData } = request.body;
            
            const ticketDetails = await this._ticketService.generateTicket(formData);
    
            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.OPERATION_SUCCESS, { ticketDetails });
        } catch (error) {
            handleControllerError(response, error);
        }
    }

    async getTickets(request: Request, response: Response): Promise<void> {
        try {
            const { accessToken } = request.cookies;
            
            const ticketDetails = await this._ticketService.getTickets(accessToken);
    
            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.OPERATION_SUCCESS, { ticketDetails });
        } catch (error) {
            handleControllerError(response, error);
        }
    }
}