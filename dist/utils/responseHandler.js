"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
const sendSuccessResponse = (res, statusCode, message, data = null) => {
    const response = {
        success: true,
        message,
        data
    };
    return res.status(statusCode).json(response);
};
exports.sendSuccessResponse = sendSuccessResponse;
const sendErrorResponse = (res, statusCode, message, details = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        details
    });
};
exports.sendErrorResponse = sendErrorResponse;
