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
const errorMessages_1 = require("../../../constants/errorMessages");
const statusCodes_1 = require("../../../constants/statusCodes");
const AppError_2 = require("../../../error/AppError");
const event_validation_1 = require("../../../validations/event/event.validation");
const tokenUtils_1 = require("../../../utils/tokenUtils");
const EventMapper_1 = __importDefault(require("../../../mappers/event/EventMapper"));
const UserMapper_1 = __importDefault(require("../../../mappers/user/UserMapper"));
const TicketMapper_1 = __importDefault(require("../../../mappers/ticket/TicketMapper"));
class OrganizerService {
    constructor(organizerRepository) {
        this._organizerRepository = organizerRepository;
    }
    toggleUserRole(user_id, new_role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!user_id || !new_role) {
                    throw new AppError_1.ValidationError(errorMessages_1.ErrorMessages.MISSING_DETAILS, statusCodes_1.StatusCodes.INVALID_INPUT);
                }
                const updatedUser = yield this._organizerRepository.toggleUserRole(user_id, new_role);
                if (!updatedUser) {
                    throw new AppError_1.ServerError(errorMessages_1.ErrorMessages.ROLE_CHANGE_FAILED, statusCodes_1.StatusCodes.BAD_REQUEST);
                }
                const userDetails = UserMapper_1.default.toIUserDTO(updatedUser);
                return userDetails;
            }
            catch (error) {
                throw (0, AppError_2.wrapServiceError)(error);
            }
        });
    }
    createEvent(accessToken, eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = event_validation_1.EventSchema.parse(eventData);
                const user_id = (0, tokenUtils_1.extractUserIdFromToken)(accessToken);
                if (!user_id) {
                    throw new AppError_1.NotFoundError(errorMessages_1.ErrorMessages.USER_ID_MISSING_IN_TOKEN, statusCodes_1.StatusCodes.NOT_FOUND);
                }
                validatedData.organizer_id = user_id;
                const mappedModel = EventMapper_1.default.toModel(validatedData);
                const createdEvent = yield this._organizerRepository.createEvent(mappedModel);
                const eventDetails = EventMapper_1.default.toIEventDTO(createdEvent);
                return eventDetails;
            }
            catch (error) {
                throw (0, AppError_2.wrapServiceError)(error);
            }
        });
    }
    updateEvent(accessToken, eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = event_validation_1.EventSchema.parse(eventData);
                const user_id = (0, tokenUtils_1.extractUserIdFromToken)(accessToken);
                if (!user_id) {
                    throw new AppError_1.NotFoundError(errorMessages_1.ErrorMessages.USER_ID_MISSING_IN_TOKEN, statusCodes_1.StatusCodes.NOT_FOUND);
                }
                validatedData.organizer_id = user_id;
                const mappedModel = EventMapper_1.default.toModel(validatedData);
                const updatedEvent = yield this._organizerRepository.updateEvent(mappedModel);
                if (!updatedEvent) {
                    throw new AppError_1.ServerError(errorMessages_1.ErrorMessages.OPERATION_FAILED, statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                }
                const eventDetails = EventMapper_1.default.toIEventDTO(updatedEvent);
                return eventDetails;
            }
            catch (error) {
                throw (0, AppError_2.wrapServiceError)(error);
            }
        });
    }
    deleteEvent(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._organizerRepository.deleteTickets(event_id);
                const isDeleted = yield this._organizerRepository.deleteEvent(event_id);
                return !!isDeleted;
            }
            catch (error) {
                throw (0, AppError_2.wrapServiceError)(error);
            }
        });
    }
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this._organizerRepository.getAllEvents();
                const events = EventMapper_1.default.toDTOs(results);
                return events;
            }
            catch (error) {
                throw (0, AppError_2.wrapServiceError)(error);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this._organizerRepository.getAllUsers();
                const users = UserMapper_1.default.toDTOs(results);
                return users;
            }
            catch (error) {
                throw (0, AppError_2.wrapServiceError)(error);
            }
        });
    }
    getAllTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this._organizerRepository.getAllTickets();
                const tickets = TicketMapper_1.default.toDTOs(results);
                return tickets;
            }
            catch (error) {
                throw (0, AppError_2.wrapServiceError)(error);
            }
        });
    }
}
exports.default = OrganizerService;
