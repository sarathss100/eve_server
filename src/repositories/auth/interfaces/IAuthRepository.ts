import IUserDocument from "../../../models/user/interfaces/IUser";

export default interface IAuthRepository {
    createUser(data: Partial<IUserDocument>): Promise<IUserDocument>;
    checkUserExist(email: string): Promise<IUserDocument | null>;
}