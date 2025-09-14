"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAndValidateToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
exports.extractUserIdFromToken = extractUserIdFromToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMessages_1 = require("../constants/errorMessages");
const statusCodes_1 = require("../constants/statusCodes");
const AppError_1 = require("../error/AppError");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFERSH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (!ACCESS_TOKEN_SECRET || !REFERSH_TOKEN_SECRET) {
    throw new Error(`Missing required environment variables: ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET`);
}
const generateAccessToken = function (user) {
    return jsonwebtoken_1.default.sign({ user_id: user.user_id, email: user.email, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = function (user) {
    return jsonwebtoken_1.default.sign({ user_id: user.user_id, email: user.email, role: user.role }, REFERSH_TOKEN_SECRET, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyAccessToken = function (token) {
    try {
        const res = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
        return res;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new Error(`Access token has expired`);
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new Error(`Invalid access token`);
        }
        else {
            throw new Error(`An unexpected error occured while verifying the access token`);
        }
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = function (token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, REFERSH_TOKEN_SECRET);
        return decoded;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new Error(`Access token has expired`);
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new Error(`Invalid access token`);
        }
        else {
            throw new Error(`An unexpected error occured while verifying the access token`);
        }
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
const decodeAndValidateToken = function (accessToken) {
    const decodedData = (0, exports.verifyAccessToken)(accessToken);
    if (!decodedData)
        throw new AppError_1.AuthenticationError(errorMessages_1.ErrorMessages.TOKEN_VERIFICATION_FAILED, statusCodes_1.StatusCodes.UNAUTHORIZED);
    const { user_id } = decodedData;
    if (!user_id)
        throw new AppError_1.ServerError(errorMessages_1.ErrorMessages.USER_ID_MISSING_IN_TOKEN, statusCodes_1.StatusCodes.BAD_REQUEST);
    return user_id;
};
exports.decodeAndValidateToken = decodeAndValidateToken;
function extractUserIdFromToken(token) {
    const userId = (0, exports.decodeAndValidateToken)(token);
    if (!userId) {
        throw new AppError_1.AuthenticationError(errorMessages_1.ErrorMessages.USER_ID_MISSING_IN_TOKEN, statusCodes_1.StatusCodes.BAD_REQUEST);
    }
    return userId;
}
