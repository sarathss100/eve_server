
export default interface IOrganizerService {
    toggleUserRole(user_id: string, new_role: string): Promise<boolean>;
}