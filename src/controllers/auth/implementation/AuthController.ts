import { Request, Response } from 'express';
import IAuthController from '../interfaces/IAuthController';
import IAuthService from '../../../services/auth/interfaces/IAuthService';
import { sendSuccessResponse } from '../../../utils/responseHandler';
import { StatusCodes } from '../../../constants/statusCodes'; 
import { SuccessMessages } from '../../../constants/successMessages'; 
import { handleControllerError } from '../../../error/AppError'; 

export default class AuthController implements IAuthController {
    private readonly _authService: IAuthService;

    constructor(authService: IAuthService) {
        this._authService = authService;
    }

    async registerUser(request: Request, response: Response): Promise<void> {
        try {
            const userData = request.body;
            
            const registrationResponse = await this._authService.registerUser(userData);

            const { accessToken } = registrationResponse;
            const { user_id, role } = registrationResponse.userDetails;
            
            response.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                domain: process.env.NODE_ENV === 'production' ? `${process.env.BASE_URL}` : undefined,
                path: '/'
            });

            sendSuccessResponse(response, StatusCodes.CREATED, SuccessMessages.SIGNUP_SUCCESS, { user_id, role });
        } catch (error) {
            handleControllerError(response, error);
        }
    }

    async signin(request: Request, response: Response): Promise<void> {
        try {
            const formData = request.body;
            
            const signinResponse = await this._authService.signin(formData);

            const { accessToken } = signinResponse;
            const { user_id, role } = signinResponse.userDetails;

            response.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                domain: process.env.NODE_ENV === 'production' ? `${process.env.BASE_URL}` : undefined,
                path: '/'
            });

            sendSuccessResponse(response, StatusCodes.CREATED, SuccessMessages.SIGNIN_SUCCESS, { user_id, role });
        } catch (error) {
            handleControllerError(response, error);
        }
    }
}
 
