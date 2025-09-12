import jwt from 'jsonwebtoken';
import { ErrorMessages } from '../constants/errorMessages';
import { StatusCodes } from '../constants/statusCodes';
import { ServerError, AuthenticationError } from '../error/AppError'; 
import IUserDTO from '../dtos/user/IUserDTO';
import ITokenPayloadDTO from '../dtos/auth/ITokenPayloadDTO';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFERSH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFERSH_TOKEN_SECRET) {
    throw new Error(`Missing required environment variables: ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET`);
}

export const generateAccessToken = function (user: Partial<IUserDTO>): string {
    return jwt.sign(
        { user_id: user.user_id, email: user.email, role: user.role },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '40m' }
    )
};

export const generateRefreshToken = function (user: IUserDTO): string {
    return jwt.sign(
        { user_id: user.user_id, email: user.email, role: user.role },
        REFERSH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )
};

export const verifyAccessToken = function (token: string): ITokenPayloadDTO {
    try {
        const res = jwt.verify(token, ACCESS_TOKEN_SECRET) as ITokenPayloadDTO;
        return res;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error(`Access token has expired`);
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error(`Invalid access token`);
        } else {
            throw new Error(`An unexpected error occured while verifying the access token`);
        }
    }
};

export const verifyRefreshToken = function (token: string): ITokenPayloadDTO {
    try {
        const decoded = jwt.verify(token, REFERSH_TOKEN_SECRET);
     
        return decoded as ITokenPayloadDTO;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error(`Access token has expired`);
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error(`Invalid access token`);
        } else {
            throw new Error(`An unexpected error occured while verifying the access token`);
        }
    }
};

export const decodeAndValidateToken = function (accessToken: string): string {
    const decodedData = verifyAccessToken(accessToken);
    if (!decodedData) throw new AuthenticationError(ErrorMessages.TOKEN_VERIFICATION_FAILED, StatusCodes.UNAUTHORIZED);

    const { user_id } = decodedData;
    if (!user_id) throw new ServerError(ErrorMessages.USER_ID_MISSING_IN_TOKEN, StatusCodes.BAD_REQUEST);

    return user_id;
};

export function extractUserIdFromToken(token: string): string {
    const userId = decodeAndValidateToken(token);
    if (!userId) {
        throw new AuthenticationError(ErrorMessages.USER_ID_MISSING_IN_TOKEN, StatusCodes.BAD_REQUEST);
    }
    return userId;
}