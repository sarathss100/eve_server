import IUserDTO from "../user/IUserDTO";

interface IRegisterationResponseDTO {
    userDetails: IUserDTO,
    accessToken: string,
}

export default IRegisterationResponseDTO;