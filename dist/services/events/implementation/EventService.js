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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../../error/AppError");
const EventMapper_1 = __importDefault(require("../../../mappers/event/EventMapper"));
const errorMessages_1 = require("../../../constants/errorMessages");
const statusCodes_1 = require("../../../constants/statusCodes");
class EventService {
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this._eventRepository.getAllEvents();
                const events = EventMapper_1.default.toDTOs(results);
                return events;
            }
            catch (error) {
                throw (0, AppError_1.wrapServiceError)(error);
            }
        });
    }
    getEvent(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._eventRepository.getEvent(event_id);
                if (!result) {
                    throw new AppError_1.NotFoundError(errorMessages_1.ErrorMessages.EVENT_NOT_FOUND, statusCodes_1.StatusCodes.NOT_FOUND);
                }
                const event = EventMapper_1.default.toIEventDTO(result);
                return event;
            }
            catch (error) {
                throw (0, AppError_1.wrapServiceError)(error);
            }
        });
    }
}
exports.default = EventService;
