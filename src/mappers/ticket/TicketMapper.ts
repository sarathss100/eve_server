import { Types } from 'mongoose';
import ITicketDocument from '../../models/tickets/interfaces/ITicket';
import ITicketDTO from '../../dtos/ticket/ITicketDTO';

export default class TicketMapper {
  // Maps ITicketDocument (Mongo model) to ITicketDTO
  static toITicketDTO(data: ITicketDocument): ITicketDTO {
    const dto: ITicketDTO = {
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
  static toDTOs(events: ITicketDocument[]): ITicketDTO[] {
    return events.map((event) => this.toITicketDTO(event));
  }

  // Maps ITicketDTO to Partial<ITicketDocument> (for create)
  static toModel(data: Partial<ITicketDTO>): Partial<ITicketDocument> {
    const model: Partial<ITicketDocument> = {
      _id: data.ticket_id,
      event_id: data.event_id,
      user_id: data.user_id,
      session_id: data.session_id,
      amount: data.amount,
      ticket_status: data.ticket_status
    };

    if (data.ticket_id) {
      model._id = new Types.ObjectId(data.ticket_id);
    }

    if (data.event_id) {
      model.event_id = new Types.ObjectId(data.event_id);
    }

    if (data.user_id) {
      model.user_id = new Types.ObjectId(data.user_id);
    }

    return model;
  }
}