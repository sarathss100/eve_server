import { Types } from 'mongoose';
import IEventDocument from '../../models/events/interfaces/IEvent';
import IEventDTO from '../../dtos/event/IEventDTO';

export default class EventMapper {
  // Maps IEventDocument (Mongo model) to IEventDTO
  static toIEventDTO(data: IEventDocument): IEventDTO {
    const dto: IEventDTO = {
      event_id: data._id.toString(),
      organizer_id: data.organizer_id.toString(),
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
      total_tickets: data.total_tickets,
    };

    return dto;
  }

  // Maps an array of IEventDocument to an array of IEventDTO
  static toDTOs(events: IEventDocument[]): IEventDTO[] {
    return events.map((event) => this.toIEventDTO(event));
  }

  // Maps IEventDTO to Partial<IEventDocument> (for create/update)
  static toModel(data: Partial<IEventDTO>): Partial<IEventDocument> {
    const model: Partial<IEventDocument> = {
      _id: data.event_id,
      organizer_id: data.organizer_id,
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
      total_tickets: data.total_tickets,
    };

    if (data.event_id) {
      model._id = new Types.ObjectId(data.event_id);
    }

    if (data.organizer_id) {
      model.organizer_id = new Types.ObjectId(data.organizer_id);
    }

    return model;
  }
}
