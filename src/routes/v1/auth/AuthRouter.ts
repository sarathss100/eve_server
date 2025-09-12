import { Router } from 'express';
import IAuthController from '../../../controllers/auth/interface/IAuthController';

const createAuthRouter = function(authController: IAuthController): Router {
    const router = Router();

    router.post('/register', authController.registerUser.bind(authController));
    router.post('/signin', authController.signin.bind(authController));
    router.post('/signout', authController.signout.bind(authController));

    return router;
};

export default createAuthRouter;