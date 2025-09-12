import { Router } from 'express';
import IOrganizerController from '../../../controllers/organizer/interface/IOrganizerController';

const createOrganizerRouter = function(organizerController: IOrganizerController): Router {
    const router = Router();

    router.post('/toggleRole', organizerController.toggleUserRole.bind(organizerController));

    return router;
};

export default createOrganizerRouter;