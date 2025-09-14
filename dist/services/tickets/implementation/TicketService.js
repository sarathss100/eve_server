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
const TicketMapper_1 = __importDefault(require("../../../mappers/ticket/TicketMapper"));
const tokenUtils_1 = require("../../../utils/tokenUtils");
class TicketService {
    constructor(ticketRepository) {
        this._ticketRepository = ticketRepository;
    }
    generateTicket(ticketData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mappedData = TicketMapper_1.default.toModel(ticketData);
                const result = yield this._ticketRepository.generateTicket(mappedData);
                const ticketDetails = TicketMapper_1.default.toITicketDTO(result);
                return ticketDetails;
            }
            catch (error) {
                throw (0, AppError_1.wrapServiceError)(error);
            }
        });
    }
    getTickets(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = (0, tokenUtils_1.extractUserIdFromToken)(accessToken);
                const result = yield this._ticketRepository.getTickets(user_id);
                const ticketDetails = TicketMapper_1.default.toDTOs(result);
                return ticketDetails;
            }
            catch (error) {
                throw (0, AppError_1.wrapServiceError)(error);
            }
        });
    }
}
exports.default = TicketService;
