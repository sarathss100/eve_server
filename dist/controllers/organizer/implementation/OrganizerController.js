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
const statusCodes_1 = require("../../../constants/statusCodes");
const successMessages_1 = require("../../../constants/successMessages");
const AppError_1 = require("../../../error/AppError");
const responseHandler_1 = require("../../../utils/responseHandler");
const errorMessages_1 = require("../../../constants/errorMessages");
class OrganizerController {
    constructor(organizerService) {
        this._organizerService = organizerService;
    }
    toggleUserRole(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { new_role } = request.body;
                const { id } = request.params;
                const userDetails = yield this._organizerService.toggleUserRole(id, new_role);
                const { user_id, name, role, email } = userDetails;
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.OK, successMessages_1.SuccessMessages.OPERATION_SUCCESS, { user_id, name, role, email });
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
    createEvent(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventData = request.body;
                const { accessToken } = request.cookies;
                if (!accessToken) {
                    throw new AppError_1.AuthenticationError(errorMessages_1.ErrorMessages.ACCESS_TOKEN_NOT_FOUND, statusCodes_1.StatusCodes.UNAUTHORIZED);
                }
                const eventDetails = yield this._organizerService.createEvent(accessToken, eventData);
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.OK, successMessages_1.SuccessMessages.OPERATION_SUCCESS, { eventDetails });
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
    updateEvent(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventData = request.body;
                const { accessToken } = request.cookies;
                if (!accessToken) {
                    throw new AppError_1.AuthenticationError(errorMessages_1.ErrorMessages.ACCESS_TOKEN_NOT_FOUND, statusCodes_1.StatusCodes.UNAUTHORIZED);
                }
                const eventDetails = yield this._organizerService.updateEvent(accessToken, eventData);
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.OK, successMessages_1.SuccessMessages.OPERATION_SUCCESS, { eventDetails });
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
    deleteEvent(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                if (!id) {
                    throw new AppError_1.AuthenticationError(errorMessages_1.ErrorMessages.EVENT_ID_MISSING, statusCodes_1.StatusCodes.UNAUTHORIZED);
                }
                const isDeleted = yield this._organizerService.deleteEvent(id);
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.OK, successMessages_1.SuccessMessages.OPERATION_SUCCESS, { isDeleted });
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
    getAllEvents(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this._organizerService.getAllEvents();
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.OK, successMessages_1.SuccessMessages.OPERATION_SUCCESS, { events });
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
    getAllUsers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this._organizerService.getAllUsers();
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.OK, successMessages_1.SuccessMessages.OPERATION_SUCCESS, { users });
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
    getAllTickets(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tickets = yield this._organizerService.getAllTickets();
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.OK, successMessages_1.SuccessMessages.OPERATION_SUCCESS, { tickets });
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
}
exports.default = OrganizerController;
