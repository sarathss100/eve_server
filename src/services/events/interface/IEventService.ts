import IEventDTO from "../../../dtos/event/IEventDTO";

export default interface IEventService {
    getAllEvents(): Promise<IEventDTO[]>;
    getEvent(event_id: string): Promise<IEventDTO>;
}