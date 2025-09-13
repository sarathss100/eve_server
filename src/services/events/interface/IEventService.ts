import IEventDTO from "../../../dtos/event/IEventDTO";

export default interface IEventService {
    getAllEvents(): Promise<IEventDTO[]>;
}