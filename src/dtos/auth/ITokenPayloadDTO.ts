
interface ITokenPayloadDTO {
    user_id: string;
    email: string;
    role: string;
    exp?: number;
    iat?: number;
}

export default ITokenPayloadDTO;