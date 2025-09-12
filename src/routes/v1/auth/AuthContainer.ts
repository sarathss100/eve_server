import AuthService from '../../../services/auth/implementation/AuthService';
import AuthController from '../../../controllers/auth/implementation/AuthController';
import IAuthController from '../../../controllers/auth/interface/IAuthController';
import BcryptHasher from '../../../utils/auth/implementation/hash';
import AuthRepository from '../../../repositories/auth/implementation/AuthRepository';
import createAuthRouter from './AuthRouter';

const hasher = new BcryptHasher();

class AuthContainer {
    public readonly controller: IAuthController;
    public readonly router: ReturnType<typeof createAuthRouter>;

    constructor() {
        const repository = new AuthRepository();
        const service = new AuthService(repository, hasher);
        this.controller = new AuthController(service);
        this.router = createAuthRouter(this.controller);
    }
}

export default AuthContainer;