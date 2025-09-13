
interface ITicketDTO {
    ticket_id: string;
    event_id: string;
    user_id: string;
    ticket_status: 'booked' | 'cancelled';
    booked_date: Date | undefined;
}

export default ITicketDTO;