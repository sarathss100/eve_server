import IEventDocument from "../../../models/events/interfaces/IEvent";
import IUserDocument from "../../../models/user/interfaces/IUser";

export default interface IOrganizerRepository {
    toggleUserRole(user_id: string, new_role: string): Promise<IUserDocument | null>;
    createEvent(eventData: Partial<IEventDocument>): Promise<IEventDocument>;
    updateEvent(eventData: Partial<IEventDocument>): Promise<IEventDocument | null>;
    deleteEvent(event_id: string): Promise<IEventDocument | null>;
    getAllEvents(): Promise<IEventDocument[]>;
}