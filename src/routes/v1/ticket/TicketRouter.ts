import { Router } from 'express';
import ITicketController from '../../../controllers/ticket/interface/ITicketController';

const createTicketRouter = function(ticketController: ITicketController): Router {
    const router = Router();

    router.post('/tickets', ticketController.generateTicket.bind(ticketController));
    router.get('/', ticketController.getTickets.bind(ticketController));

    return router;
};

export default createTicketRouter;