"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = exports.ForbiddenError = exports.ConflictError = exports.NotFoundError = exports.ServerError = exports.AuthorizationError = exports.AuthenticationError = exports.ValidationError = exports.AppError = void 0;
exports.wrapServiceError = wrapServiceError;
exports.handleControllerError = handleControllerError;
const zod_1 = require("zod");
const errorMessages_1 = require("../constants/errorMessages");
const statusCodes_1 = require("../constants/statusCodes");
const responseHandler_1 = require("../utils/responseHandler");
// Base error class
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        console.log(`${statusCode} and ${message}`);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
// ValidationError for invalid input
class ValidationError extends AppError {
    constructor(message, statusCode = statusCodes_1.StatusCodes.BAD_REQUEST) {
        super(message, statusCode);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
// AuthenticationError for token-related issues
class AuthenticationError extends AppError {
    constructor(message, statusCode = statusCodes_1.StatusCodes.UNAUTHORIZED) {
        super(message, statusCode);
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}
exports.AuthenticationError = AuthenticationError;
// AuthorizationError for permission-related issues (fixed typo)
class AuthorizationError extends AppError {
    constructor(message, statusCode = statusCodes_1.StatusCodes.FORBIDDEN) {
        super(message, statusCode);
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }
}
exports.AuthorizationError = AuthorizationError;
// ServerError for unexpected server-side issues
class ServerError extends AppError {
    constructor(message = errorMessages_1.ErrorMessages.INTERNAL_SERVER_ERROR, statusCode = statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message, statusCode);
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}
exports.ServerError = ServerError;
// Not found Error 
class NotFoundError extends AppError {
    constructor(message = 'The requested resource was not found.', statusCode = statusCodes_1.StatusCodes.NOT_FOUND) {
        super(message, statusCode);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
// Conflict Error
class ConflictError extends AppError {
    constructor(message = 'A conflict occurred with the current state of the resource.', statusCode = statusCodes_1.StatusCodes.CONFLICT) {
        super(message, statusCode);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
exports.ConflictError = ConflictError;
// Forbidden Error
class ForbiddenError extends AppError {
    constructor(message = 'You do not have sufficient permissions to perform this action.', statusCode = statusCodes_1.StatusCodes.FORBIDDEN) {
        super(message, statusCode);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
exports.ForbiddenError = ForbiddenError;
// Service Unavailable Error
class ServiceUnavailableError extends AppError {
    constructor(message = 'The service is currently unavailable. Please try again later.', statusCode = statusCodes_1.StatusCodes.BAD_REQUEST) {
        super(message, statusCode);
        Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
function wrapServiceError(error) {
    console.error('Error while registering account: ', error);
    if (error instanceof zod_1.ZodError) {
        const message = error.issues.map(e => e.message).join(", ");
        throw new ValidationError(message);
    }
    if (error instanceof ValidationError ||
        error instanceof ServerError ||
        error instanceof ConflictError) {
        throw error;
    }
    throw new ServerError(errorMessages_1.ErrorMessages.INTERNAL_SERVER_ERROR);
}
function handleControllerError(response, error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error;
    (0, responseHandler_1.sendErrorResponse)(response, err.statusCode || statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR, err.message || errorMessages_1.ErrorMessages.INTERNAL_SERVER_ERROR);
}
