import IEventDocument from "../../../models/events/interfaces/IEvent";

export default interface IEventRepository {
    createEvent(eventData: IEventDocument): Promise<IEventDocument>;
}