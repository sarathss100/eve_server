import { Router } from 'express';  
import AuthContainer from './auth/AuthContainer';

const apiV1Router = Router();

const authContainer = new AuthContainer();

// Public routes
apiV1Router.use('/auth', authContainer.router);

export default apiV1Router;