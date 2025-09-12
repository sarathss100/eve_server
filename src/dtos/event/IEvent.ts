
interface IEvent {
    _id: string;
    organizer_id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    total_tickets: number;
};

export default IEvent;