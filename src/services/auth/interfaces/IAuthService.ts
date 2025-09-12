import IRegisterDTO from '../../../dtos/auth/IRegisterDTO';
import IRegisterationResponseDTO from '../../../dtos/auth/IRegistrationResponseDTO';

export default interface IAuthService {
    registerUser(userData: IRegisterDTO): Promise<IRegisterationResponseDTO>;
}