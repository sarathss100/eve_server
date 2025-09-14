"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrganizerController_1 = __importDefault(require("../../../controllers/organizer/implementation/OrganizerController"));
const OrganizerRepository_1 = __importDefault(require("../../../repositories/organizer/implementation/OrganizerRepository"));
const OrganizerService_1 = __importDefault(require("../../../services/organizer/implementation/OrganizerService"));
const OrganizerRouter_1 = __importDefault(require("./OrganizerRouter"));
class OrganizerContainer {
    constructor() {
        const repository = new OrganizerRepository_1.default();
        const service = new OrganizerService_1.default(repository);
        this.controller = new OrganizerController_1.default(service);
        this.router = (0, OrganizerRouter_1.default)(this.controller);
    }
}
exports.default = OrganizerContainer;
