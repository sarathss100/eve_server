import { Request, Response } from 'express';
import IAuthController from '../interface/IAuthController';
import IAuthService from '../../../services/auth/interfaces/IAuthService';
import { sendSuccessResponse } from '../../../utils/responseHandler';
import { StatusCodes } from '../../../constants/statusCodes'; 
import { SuccessMessages } from '../../../constants/successMessages'; 
import { AuthenticationError, handleControllerError, ServerError } from '../../../error/AppError'; 
import { ErrorMessages } from '../../../constants/errorMessages';

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
            const { user_id, role, name, email, phone_number, joined_date } = registrationResponse.userDetails;
            
            response.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                domain: process.env.NODE_ENV === 'production' ? `${process.env.BASE_URL}` : undefined,
                path: '/'
            });

            sendSuccessResponse(response, StatusCodes.CREATED, SuccessMessages.SIGNUP_SUCCESS, { user_id, role, name, email, phone_number, joined_date });
        } catch (error) {
            handleControllerError(response, error);
        }
    }

    async signin(request: Request, response: Response): Promise<void> {
        try {
            const formData = request.body;
            
            const signinResponse = await this._authService.signin(formData);

            const { accessToken } = signinResponse;
            const { user_id, role, name, email, phone_number, joined_date } = signinResponse.userDetails;

            response.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                domain: process.env.NODE_ENV === 'production' ? `${process.env.BASE_URL}` : undefined,
                path: '/'
            });

            sendSuccessResponse(response, StatusCodes.CREATED, SuccessMessages.SIGNIN_SUCCESS, { user_id, role, name, email, phone_number, joined_date });
        } catch (error) {
            handleControllerError(response, error);
        }
    }

    async signout(request: Request, response: Response): Promise<void> {
        try {
            const { accessToken } = request.cookies;

            if (!accessToken) {
                throw new AuthenticationError(ErrorMessages.ACCESS_TOKEN_NOT_FOUND, StatusCodes.UNAUTHORIZED);
            }

            const signoutStatus = await this._authService.signout(accessToken);
            if (!signoutStatus) {
                throw new ServerError(ErrorMessages.SIGNOUT_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
            }

            response.clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'? true : false,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                domain: process.env.NODE_ENV === 'production' ? `${process.env.BASE_URL}` : undefined,
                path: '/'
            });

            sendSuccessResponse(response, StatusCodes.OK, SuccessMessages.SIGNOUT_SUCCESS);
        } catch (error) {
            handleControllerError(response, error);
        }
    }
}
 
