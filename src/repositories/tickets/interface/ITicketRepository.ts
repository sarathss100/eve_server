import ITicketDocument from "../../../models/tickets/interfaces/ITicket";

export default interface ITicketRepository {
    generateTicket(ticketData: Partial<ITicketDocument>): Promise<ITicketDocument>;
    getTickets(user_id: string): Promise<ITicketDocument[]>;
}