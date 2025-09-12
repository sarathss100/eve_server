import { ZodError } from "zod";
import { ErrorMessages } from "../constants/errorMessages";
import { StatusCodes } from "../constants/statusCodes";
import { sendErrorResponse } from "../utils/responseHandler";
import { Response } from 'express';

// Base error class
export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        console.log(`${statusCode} and ${message}`);

        Object.setPrototypeOf(this, AppError.prototype);
    }
}

// ValidationError for invalid input
export class ValidationError extends AppError {
    constructor(message: string, statusCode: number = StatusCodes.BAD_REQUEST) {
        super(message, statusCode);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

// AuthenticationError for token-related issues
export class AuthenticationError extends AppError {
    constructor(message: string, statusCode: number = StatusCodes.UNAUTHORIZED) {
        super(message, statusCode);
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}

// AuthorizationError for permission-related issues (fixed typo)
export class AuthorizationError extends AppError {
    constructor(message: string, statusCode: number = StatusCodes.FORBIDDEN) {
        super(message, statusCode);
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }
}

// ServerError for unexpected server-side issues
export class ServerError extends AppError {
    constructor(message: string = ErrorMessages.INTERNAL_SERVER_ERROR, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message, statusCode);
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}

// Not found Error 
export class NotFoundError extends AppError {
    constructor(message: string = 'The requested resource was not found.', statusCode: number = StatusCodes.NOT_FOUND) {
        super(message, statusCode);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

// Conflict Error
export class ConflictError extends AppError {
    constructor(message: string = 'A conflict occurred with the current state of the resource.', statusCode: number = StatusCodes.CONFLICT) {
        super(message, statusCode);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}

// Forbidden Error
export class ForbiddenError extends AppError {
    constructor(message: string = 'You do not have sufficient permissions to perform this action.', statusCode: number = StatusCodes.FORBIDDEN) {
        super(message, statusCode);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}

// Service Unavailable Error
export class ServiceUnavailableError extends AppError {
    constructor(message: string = 'The service is currently unavailable. Please try again later.', statusCode: number = StatusCodes.BAD_REQUEST) {
        super(message, statusCode);
        Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
    }
}

export function wrapServiceError(error: unknown): AppError {
    console.error('Error while registering account: ', error);

    if (error instanceof ZodError) {
        const message = error.issues.map(e => e.message).join(", ");
        throw new ValidationError(message);
    }

    if (error instanceof ValidationError || 
        error instanceof ServerError || 
        error instanceof ConflictError) {
        throw error;
    }
            
    throw new ServerError(ErrorMessages.INTERNAL_SERVER_ERROR);
}

export function handleControllerError(response: Response, error: unknown): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;

    sendErrorResponse(
        response, 
        err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, 
        err.message || ErrorMessages.INTERNAL_SERVER_ERROR
    );
}