
interface IEventDTO {
    event_id: string;
    organizer_id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    total_tickets: number;
    price: number;
};

export default IEventDTO;