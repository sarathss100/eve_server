import { Router } from 'express';  
import AuthContainer from './auth/AuthContainer';
import { authorizeRoles } from '../../middlewares/authMiddleware';
import { UserRole } from '../../types/UserRole';
import OrganizerContainer from './organizer/OrganizerContainer';
import EventContainer from './events/EventsContainer';

const apiV1Router = Router();

const authContainer = new AuthContainer();
const organizerContainer = new OrganizerContainer();
const eventContainer = new EventContainer();

// Public routes
apiV1Router.use('/auth', authContainer.router);
apiV1Router.use('/events', eventContainer.router);

// Organizer-only routes
apiV1Router.use('/organizer', authorizeRoles(UserRole.ORGANIZER), organizerContainer.router);

export default apiV1Router;