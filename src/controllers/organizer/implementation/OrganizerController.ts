import { Request, Response } from 'express';
import { StatusCodes } from "../../../constants/statusCodes";
import { SuccessMessages } from "../../../constants/successMessages";
import { handleControllerError } from "../../../error/AppError";
import IOrganizerService from "../../../services/organizer/interface/IOrganizerService";
import { sendSuccessResponse } from "../../../utils/responseHandler";
import IOrganizerController from "../interface/IOrganizerController";

export default class OrganizerController implements IOrganizerController {
    private readonly _organizerService: IOrganizerService;

    constructor(organizerService: IOrganizerService) {
        this._organizerService = organizerService;
    }

    async toggleUserRole(request: Request, response: Response): Promise<void> {
        try {
            const { user_id, role } = request.body;
            
            const isToggled = await this._organizerService.toggleUserRole(user_id, role);
    
            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.OPERATION_SUCCESS, { isToggled });
        } catch (error) {
            handleControllerError(response, error);
        }
    }
}