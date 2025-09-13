import { Router } from 'express';
import IOrganizerController from '../../../controllers/organizer/interface/IOrganizerController';

const createOrganizerRouter = function(organizerController: IOrganizerController): Router {
    const router = Router();

    router.get('/users', organizerController.getAllUsers.bind(organizerController));
    router.put('/users/role/:id', organizerController.toggleUserRole.bind(organizerController));
    router.post('/event', organizerController.createEvent.bind(organizerController));
    router.patch('/event', organizerController.updateEvent.bind(organizerController));
    router.delete('/event/:id', organizerController.deleteEvent.bind(organizerController));
    router.get('/events', organizerController.getAllEvents.bind(organizerController));

    return router;
};

export default createOrganizerRouter;