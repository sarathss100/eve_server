
interface IEventDTO {
    event_id: string;
    organizer_id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    initial_ticket_count: number;
    total_tickets: number;
    price: number;
    createdAt: Date | undefined;
};

export default IEventDTO;