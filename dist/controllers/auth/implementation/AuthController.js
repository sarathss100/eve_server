"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler_1 = require("../../../utils/responseHandler");
const statusCodes_1 = require("../../../constants/statusCodes");
const successMessages_1 = require("../../../constants/successMessages");
const AppError_1 = require("../../../error/AppError");
const errorMessages_1 = require("../../../constants/errorMessages");
class AuthController {
    constructor(authService) {
        this._authService = authService;
    }
    registerUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = request.body;
                const registrationResponse = yield this._authService.registerUser(userData);
                const { accessToken } = registrationResponse;
                const { user_id, role, name, email, phone_number, joined_date } = registrationResponse.userDetails;
                response.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    domain: process.env.NODE_ENV === 'production' ? `${process.env.BASE_URL}` : undefined,
                    path: '/'
                });
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.CREATED, successMessages_1.SuccessMessages.SIGNUP_SUCCESS, { user_id, role, name, email, phone_number, joined_date });
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
    signin(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formData = request.body;
                const signinResponse = yield this._authService.signin(formData);
                const { accessToken } = signinResponse;
                const { user_id, role, name, email, phone_number, joined_date } = signinResponse.userDetails;
                response.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    domain: process.env.NODE_ENV === 'production' ? `${process.env.BASE_URL}` : undefined,
                    path: '/'
                });
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.CREATED, successMessages_1.SuccessMessages.SIGNIN_SUCCESS, { user_id, role, name, email, phone_number, joined_date });
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
    signout(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accessToken } = request.cookies;
                if (!accessToken) {
                    throw new AppError_1.AuthenticationError(errorMessages_1.ErrorMessages.ACCESS_TOKEN_NOT_FOUND, statusCodes_1.StatusCodes.UNAUTHORIZED);
                }
                const signoutStatus = yield this._authService.signout(accessToken);
                if (!signoutStatus) {
                    throw new AppError_1.ServerError(errorMessages_1.ErrorMessages.SIGNOUT_ERROR, statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                }
                response.clearCookie('accessToken', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    domain: process.env.NODE_ENV === 'production' ? `${process.env.BASE_URL}` : undefined,
                    path: '/'
                });
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.OK, successMessages_1.SuccessMessages.SIGNOUT_SUCCESS);
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
}
exports.default = AuthController;
