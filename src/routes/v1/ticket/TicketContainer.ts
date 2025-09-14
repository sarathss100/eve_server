import createPayemntRouter from './TicketRouter';
import ITicketController from '../../../controllers/ticket/interface/ITicketController';
import createTicketRouter from './TicketRouter';
import TicketRepository from '../../../repositories/tickets/implementation/TicketRepository';
import TicketService from '../../../services/tickets/implementation/TicketService';
import TicketController from '../../../controllers/ticket/implementation/TicketController';

class TicketContainer {
    public readonly controller: ITicketController;
    public readonly router: ReturnType<typeof createTicketRouter>;

    constructor() {
        const repository = new TicketRepository();
        const service = new TicketService(repository);
        this.controller = new TicketController(service);
        this.router = createPayemntRouter(this.controller);
    }
}

export default TicketContainer;