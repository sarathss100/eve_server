import IUserDocument from "../../../models/user/interfaces/IUser";

export default interface IOrganizerRepository {
    toggleUserRole(user_id: string, new_role: string): Promise<IUserDocument | null>;
}