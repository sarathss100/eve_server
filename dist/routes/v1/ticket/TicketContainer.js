"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TicketRouter_1 = __importDefault(require("./TicketRouter"));
const TicketRepository_1 = __importDefault(require("../../../repositories/tickets/implementation/TicketRepository"));
const TicketService_1 = __importDefault(require("../../../services/tickets/implementation/TicketService"));
const TicketController_1 = __importDefault(require("../../../controllers/ticket/implementation/TicketController"));
class TicketContainer {
    constructor() {
        const repository = new TicketRepository_1.default();
        const service = new TicketService_1.default(repository);
        this.controller = new TicketController_1.default(service);
        this.router = (0, TicketRouter_1.default)(this.controller);
    }
}
exports.default = TicketContainer;
