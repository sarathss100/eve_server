import EventController from '../../../controllers/events/implementation/EventController';
import IEventController from '../../../controllers/events/interface/IEventController';
import EventRepository from '../../../repositories/events/implementation/EventRepository';
import EventService from '../../../services/events/implementation/EventService';
import createEventRouter from './EventsRouter';

class EventContainer {
    public readonly controller: IEventController;
    public readonly router: ReturnType<typeof createEventRouter>;

    constructor() {
        const repository = new EventRepository();
        const service = new EventService(repository);
        this.controller = new EventController(service);
        this.router = createEventRouter(this.controller);
    }
}

export default EventContainer;