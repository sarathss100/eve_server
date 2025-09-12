import { Router } from 'express';  
import AuthContainer from './auth/AuthContainer';
import { authorizeRoles } from '../../middlewares/authMiddleware';
import { UserRole } from '../../types/UserRole';
import OrganizerContainer from './organizer/OrganizerContainer';

const apiV1Router = Router();

const authContainer = new AuthContainer();
const organizerContainer = new OrganizerContainer();

// Public routes
apiV1Router.use('/auth', authContainer.router);

// Organizer-only routes
apiV1Router.use('/organizer', authorizeRoles(UserRole.ORGANIZER), organizerContainer.router);

export default apiV1Router;