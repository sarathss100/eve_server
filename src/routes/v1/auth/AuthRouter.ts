import { Router } from 'express';
import IAuthController from '../../../controllers/auth/interfaces/IAuthController';

const createAuthRouter = function(authController: IAuthController): Router {
    const router = Router();

    router.post('/register', authController.registerUser.bind(authController));

    return router;
};

export default createAuthRouter;