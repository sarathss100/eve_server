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
const user_model_1 = require("../../../models/user/model/user.model");
const BaseRepository_1 = __importDefault(require("../../base/implementation/BaseRepository"));
const event_model_1 = require("../../../models/events/model/event.model");
const ticket_model_1 = require("../../../models/tickets/model/ticket.model");
const mongoose_1 = require("mongoose");
class OrganizerRepository {
    constructor() {
        this.userBaseRepo = new BaseRepository_1.default(user_model_1.UserModel);
        this.eventBaseRepo = new BaseRepository_1.default(event_model_1.EventModel);
        this.ticketBaseRepo = new BaseRepository_1.default(ticket_model_1.TicketModel);
    }
    toggleUserRole(_id, new_role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userBaseRepo.updateOne({ _id }, { $set: { role: new_role } });
                return result;
            }
            catch (error) {
                throw new Error(`Failed to toggle user role: ${error.message}`);
            }
        });
    }
    createEvent(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.eventBaseRepo.create(eventData);
                return result;
            }
            catch (error) {
                throw new Error(`Failed to create an event: ${error.message}`);
            }
        });
    }
    updateEvent(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.eventBaseRepo.updateOne({ _id: eventData._id }, { $set: eventData });
                return result;
            }
            catch (error) {
                throw new Error(`Failed to create an event: ${error.message}`);
            }
        });
    }
    deleteEvent(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.eventBaseRepo.deleteOne({ _id: event_id });
                return result;
            }
            catch (error) {
                throw new Error(`Failed to delete an event: ${error.message}`);
            }
        });
    }
    deleteTickets(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = new mongoose_1.Types.ObjectId(event_id);
                const result = yield this.ticketBaseRepo.deleteMany({ event_id: eventId });
                return result;
            }
            catch (error) {
                throw new Error(`Failed to delete an event: ${error.message}`);
            }
        });
    }
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.eventBaseRepo.findAll();
                return result;
            }
            catch (error) {
                throw new Error(`Failed to get events: ${error.message}`);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userBaseRepo.findAll();
                return result;
            }
            catch (error) {
                throw new Error(`Failed to get attendees: ${error.message}`);
            }
        });
    }
    getAllTickets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.ticketBaseRepo.findAll();
                return result;
            }
            catch (error) {
                throw new Error(`Failed to get attendees: ${error.message}`);
            }
        });
    }
    updateTickets(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = new mongoose_1.Types.ObjectId(event_id);
                const result = yield this.ticketBaseRepo.updateMany({ event_id: eventId }, { $set: { ticket_status: 'cancelled' } });
                return result;
            }
            catch (error) {
                throw new Error(`Failed to get attendees: ${error.message}`);
            }
        });
    }
}
exports.default = OrganizerRepository;
