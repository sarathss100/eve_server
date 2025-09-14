import ITicketDTO from "../../../dtos/ticket/ITicketDTO";

export default interface ITicketService {
    generateTicket(ticketData: Partial<ITicketDTO>): Promise<ITicketDTO>;
    getTickets(accessToken: string): Promise<ITicketDTO[]>;
}