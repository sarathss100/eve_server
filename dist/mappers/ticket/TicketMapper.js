"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class TicketMapper {
    // Maps ITicketDocument (Mongo model) to ITicketDTO
    static toITicketDTO(data) {
        const dto = {
            ticket_id: data._id.toString(),
            event_id: data.event_id.toString(),
            user_id: data.user_id.toString(),
            session_id: data.session_id,
            amount: data.amount,
            ticket_status: data.ticket_status,
            purchased_at: data.createdAt,
        };
        return dto;
    }
    // Maps an array of ITicketDocument to an array of ITicketDTO
    static toDTOs(events) {
        return events.map((event) => this.toITicketDTO(event));
    }
    // Maps ITicketDTO to Partial<ITicketDocument> (for create)
    static toModel(data) {
        const model = {
            _id: data.ticket_id,
            event_id: data.event_id,
            user_id: data.user_id,
            session_id: data.session_id,
            amount: data.amount,
            ticket_status: data.ticket_status
        };
        if (data.ticket_id) {
            model._id = new mongoose_1.Types.ObjectId(data.ticket_id);
        }
        if (data.event_id) {
            model.event_id = new mongoose_1.Types.ObjectId(data.event_id);
        }
        if (data.user_id) {
            model.user_id = new mongoose_1.Types.ObjectId(data.user_id);
        }
        return model;
    }
}
exports.default = TicketMapper;
