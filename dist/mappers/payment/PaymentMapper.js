"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class PaymentMapper {
    // Maps IPaymentDocument (Mongo model) to IPaymentDTO
    static toIPaymentDTO(data) {
        const dto = {
            payment_id: data._id.toString(),
            ticket_id: data.ticket_id.toString(),
            amount: data.amount,
            payment_method: data.payment_method,
            payment_status: data.payment_status,
            paid_date: data.createdAt,
        };
        return dto;
    }
    // Maps an array of IPaymentDocument to an array of IPaymentDTO
    static toDTOs(events) {
        return events.map((event) => this.toIPaymentDTO(event));
    }
    // Maps IPaymentDTO to Partial<IPaymentDocument> (for create)
    static toModel(data) {
        const model = {
            _id: data._id,
            payment_id: data.payment_id,
            ticket_id: data.ticket_id,
            amount: data.amount,
            payment_method: data.payment_method,
            payment_status: data.payment_status,
        };
        if (data._id) {
            model._id = new mongoose_1.Types.ObjectId(data._id);
        }
        if (data.ticket_id) {
            model.ticket_id = new mongoose_1.Types.ObjectId(data.ticket_id);
        }
        return model;
    }
}
exports.default = PaymentMapper;
