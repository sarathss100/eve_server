import IEventDTO from "../../../dtos/event/IEventDTO";

export default interface IOrganizerService {
    toggleUserRole(user_id: string, new_role: string): Promise<boolean>;
    createEvent(accessToken: string, eventData: IEventDTO): Promise<IEventDTO>;
    updateEvent(accessToken: string, eventData: Partial<IEventDTO>): Promise<IEventDTO>;
    deleteEvent(event_id: string): Promise<boolean>;
    getAllEvents(): Promise<IEventDTO[]>;
}