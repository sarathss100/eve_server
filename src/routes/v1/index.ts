import { Router } from 'express';  
import AuthContainer from './auth/AuthContainer';
import { authorizeRoles } from '../../middlewares/authMiddleware';
import { UserRole } from '../../types/UserRole';
import OrganizerContainer from './organizer/OrganizerContainer';
import EventContainer from './events/EventsContainer';
import PaymentContainer from './payment/PaymentContainer';
import TicketContainer from './ticket/TicketContainer';

const apiV1Router = Router();

const authContainer = new AuthContainer();
const organizerContainer = new OrganizerContainer();
const eventContainer = new EventContainer();
const paymentContainer = new PaymentContainer();
const ticketContainer = new TicketContainer();

// Public routes
apiV1Router.use('/auth', authContainer.router);
apiV1Router.use('/events', eventContainer.router);

// Protected routes
apiV1Router.use('/payments', authorizeRoles(UserRole.ATTENDEE, UserRole.ORGANIZER), paymentContainer.router);
apiV1Router.use('/tickets', authorizeRoles(UserRole.ATTENDEE, UserRole.ORGANIZER), ticketContainer.router);

// Organizer-only routes
apiV1Router.use('/organizer', authorizeRoles(UserRole.ORGANIZER), organizerContainer.router);

export default apiV1Router;