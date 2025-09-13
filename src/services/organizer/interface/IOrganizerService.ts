import IEventDTO from "../../../dtos/event/IEventDTO";
import IUserDTO from "../../../dtos/user/IUserDTO";

export default interface IOrganizerService {
    toggleUserRole(user_id: string, new_role: string): Promise<IUserDTO>;
    createEvent(accessToken: string, eventData: IEventDTO): Promise<IEventDTO>;
    updateEvent(accessToken: string, eventData: Partial<IEventDTO>): Promise<IEventDTO>;
    deleteEvent(event_id: string): Promise<boolean>;
    getAllEvents(): Promise<IEventDTO[]>;
    getAllUsers(): Promise<IUserDTO[]>;
}