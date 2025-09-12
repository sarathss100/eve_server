
interface IUserDTO {
    user_id: string;
    name: string;
    email: string;
    phone_number?: string;
    role: 'organizer' | 'attendee';
    password: string;
}

export default IUserDTO;