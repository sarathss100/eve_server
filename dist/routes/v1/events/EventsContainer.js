"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventController_1 = __importDefault(require("../../../controllers/events/implementation/EventController"));
const EventRepository_1 = __importDefault(require("../../../repositories/events/implementation/EventRepository"));
const EventService_1 = __importDefault(require("../../../services/events/implementation/EventService"));
const EventsRouter_1 = __importDefault(require("./EventsRouter"));
class EventContainer {
    constructor() {
        const repository = new EventRepository_1.default();
        const service = new EventService_1.default(repository);
        this.controller = new EventController_1.default(service);
        this.router = (0, EventsRouter_1.default)(this.controller);
    }
}
exports.default = EventContainer;
