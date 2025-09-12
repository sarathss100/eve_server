import { Response, NextFunction } from 'express';
import { UserRole } from '../types/UserRole'; 
import { sendErrorResponse } from '../utils/responseHandler';
import { StatusCodes } from '../constants/statusCodes';
import { generateAccessToken, verifyAccessToken } from '../utils/tokenUtils';
import IAuthenticationRequest from './interfaces/IAuthenticationRequest';
import { ErrorMessages } from '../constants/errorMessages';
import RedisService from '../services/redis/RedisService';
import ITokenPayload from '../dtos/auth/ITokenPayloadDTO';

export const authorizeRoles = function (...allowedRoles: UserRole[]) {
    return async (request: IAuthenticationRequest, response: Response, next: NextFunction) => {
        try {
            const authHeader = request.cookies;
            if (!authHeader) {
                sendErrorResponse(response, StatusCodes.UNAUTHORIZED, ErrorMessages.ACCESS_TOKEN_NOT_FOUND);
                return;
            }

            let accessToken = authHeader.accessToken;

            let decoded = verifyAccessToken(accessToken);

            if (!decoded) {
                sendErrorResponse(response, StatusCodes.UNAUTHORIZED, ErrorMessages.TOKEN_VERIFICATION_FAILED);
                return;
            } 

            const currentTime = Math.floor(Date.now() / 1000);

            // If token is expired, try refreshing it 
            if (decoded.exp && decoded.exp < currentTime) {
                const userId = decoded.user_id;

                // Try to retrieve refresh token from Redis 
                const refreshTokenFromRedis = await RedisService.getRefreshToken(userId);

                if (!refreshTokenFromRedis) {
                    // No refresh token foud, force logout,
                    sendErrorResponse(response, StatusCodes.UNAUTHORIZED, ErrorMessages.REFRESH_TOKEN_REMOVAL_ERROR);
                    response.clearCookie('accessToken', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production'? true : false,
                        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    });

                    return;
                }

                const newAccessToken = generateAccessToken({ 
                    user_id: decoded.user_id,
                    email: decoded.email, 
                    role: decoded.role === 'organizer' ? 'organizer' : 'attendee',
                });

                // Set the new access toke in cookies or headers
                response.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                });

                // Update decoded with new access token 
                decoded = verifyAccessToken(newAccessToken) as ITokenPayload;
                accessToken = newAccessToken;
            }

            // Final check: ensure decoded is valid
            if (!decoded) {
                sendErrorResponse(response, StatusCodes.UNAUTHORIZED, ErrorMessages.TOKEN_VERIFICATION_FAILED);
                return;
            }

            // Role-based authorization
            if (!allowedRoles.includes(decoded.role as UserRole)) {
                sendErrorResponse(response, StatusCodes.FORBIDDEN, ErrorMessages.FORBIDDEN_INSUFFICIENT_PERMISSIONS);
                return;
            }

            // Attach the user's ID and role to the request object for downstream use
            request.user = { userId: decoded.user_id, role: decoded.role };
        
            next();
        } catch (error) {
            console.error(`Error in authorizeRoles middleware:`, error);
            sendErrorResponse(response, StatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.INTERNAL_SERVER_ERROR);
            return;
        }
    }
}
