import IEventDocument from "../../../models/events/interfaces/IEvent";

export default interface IEventRepository {
    createEvent(eventData: IEventDocument): Promise<IEventDocument>;
    getAllEvents(): Promise<IEventDocument[]>;
    getEvent(event_id: string): Promise<IEventDocument | null>
    reduceTicketCount(event_id: string): Promise<IEventDocument | null>; 
}