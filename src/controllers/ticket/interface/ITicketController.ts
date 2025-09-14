import { Request, Response } from 'express';

export default interface ITicketController {
    generateTicket(request: Request, response: Response): Promise<void>;
    getTickets(request: Request, response: Response): Promise<void>;
}
