
interface ITicketDTO {
    ticket_id: string;
    event_id: string;
    user_id: string;
    session_id: string;
    amount: number;
    ticket_status: 'confirmed' | 'cancelled';
    purchased_at: Date | undefined;
}

export default ITicketDTO;