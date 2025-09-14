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
const event_model_1 = require("../../../models/events/model/event.model");
const BaseRepository_1 = __importDefault(require("../../base/implementation/BaseRepository"));
const mongoose_1 = require("mongoose");
class EventRepository {
    constructor() {
        this.baseRepo = new BaseRepository_1.default(event_model_1.EventModel);
    }
    createEvent(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.baseRepo.create(eventData);
                return result;
            }
            catch (error) {
                throw new Error(`Failed to create event: ${error.message}`);
            }
        });
    }
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.baseRepo.findAll();
                return result;
            }
            catch (error) {
                throw new Error(`Failed to get events: ${error.message}`);
            }
        });
    }
    getEvent(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = new mongoose_1.Types.ObjectId(event_id);
                const result = yield this.baseRepo.findOne(eventId);
                return result;
            }
            catch (error) {
                throw new Error(`Failed to get events: ${error.message}`);
            }
        });
    }
    reduceTicketCount(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = new mongoose_1.Types.ObjectId(event_id);
                const updatedEvent = yield event_model_1.EventModel.findOneAndUpdate({ _id: eventId, total_tickets: { $gt: 0 } }, { $inc: { total_tickets: -1 } }, { new: true });
                if (!updatedEvent) {
                    throw new Error("Event not found or no tickets left");
                }
                return updatedEvent;
            }
            catch (error) {
                throw new Error(`Failed to reduce ticket count: ${error.message}`);
            }
        });
    }
}
exports.default = EventRepository;
