import IRegisterDTO from '../../../dtos/auth/IRegisterDTO';
import IRegisterationResponseDTO from '../../../dtos/auth/IRegistrationResponseDTO';
import ISigninDTO from '../../../dtos/auth/ISigninDTO';

export default interface IAuthService {
    registerUser(userData: IRegisterDTO): Promise<IRegisterationResponseDTO>;
    signin(formData: ISigninDTO): Promise<IRegisterationResponseDTO>;
}