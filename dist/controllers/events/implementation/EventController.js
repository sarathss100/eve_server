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
class EventController {
    constructor(eventService) {
        this._eventService = eventService;
    }
    getAllEvents(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this._eventService.getAllEvents();
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.OK, successMessages_1.SuccessMessages.OPERATION_SUCCESS, { events });
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
    getEvent(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const event = yield this._eventService.getEvent(id);
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.OK, successMessages_1.SuccessMessages.OPERATION_SUCCESS, { event });
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
}
exports.default = EventController;
