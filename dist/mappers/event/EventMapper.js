"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class EventMapper {
    // Maps IEventDocument (Mongo model) to IEventDTO
    static toIEventDTO(data) {
        const dto = {
            event_id: data._id.toString(),
            organizer_id: data.organizer_id.toString(),
            title: data.title,
            description: data.description,
            date: data.date,
            location: data.location,
            initial_ticket_count: data.initial_ticket_count,
            total_tickets: data.total_tickets,
            price: data.price,
            createdAt: data.createdAt,
        };
        return dto;
    }
    // Maps an array of IEventDocument to an array of IEventDTO
    static toDTOs(events) {
        return events.map((event) => this.toIEventDTO(event));
    }
    // Maps IEventDTO to Partial<IEventDocument> (for create/update)
    static toModel(data) {
        const model = {
            _id: data.event_id,
            organizer_id: data.organizer_id,
            title: data.title,
            description: data.description,
            date: data.date,
            location: data.location,
            total_tickets: data.total_tickets,
            price: data.price,
        };
        if (data.event_id) {
            model._id = new mongoose_1.Types.ObjectId(data.event_id);
        }
        if (data.organizer_id) {
            model.organizer_id = new mongoose_1.Types.ObjectId(data.organizer_id);
        }
        return model;
    }
}
exports.default = EventMapper;
