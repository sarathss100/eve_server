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
const BaseRepository_1 = __importDefault(require("../../base/implementation/BaseRepository"));
const ticket_model_1 = require("../../../models/tickets/model/ticket.model");
const mongoose_1 = require("mongoose");
class TicketRepository {
    constructor() {
        this.ticketBaseRepo = new BaseRepository_1.default(ticket_model_1.TicketModel);
    }
    generateTicket(ticketData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.ticketBaseRepo.create(ticketData);
                return result;
            }
            catch (error) {
                throw new Error(`Failed to create an payment history: ${error.message}`);
            }
        });
    }
    getTickets(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = new mongoose_1.Types.ObjectId(user_id);
                const result = yield this.ticketBaseRepo.find({ user_id: userId });
                return result;
            }
            catch (error) {
                throw new Error(`Failed to create an payment history: ${error.message}`);
            }
        });
    }
}
exports.default = TicketRepository;
