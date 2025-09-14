import { Router } from 'express';
import IEventController from '../../../controllers/events/interface/IEventController';

const createEventRouter = function(eventController: IEventController): Router {
    const router = Router();

    router.get('/', eventController.getAllEvents.bind(eventController));
    router.get('/:id', eventController.getEvent.bind(eventController))

    return router;
};

export default createEventRouter;