import IAuthRepository from '../interfaces/IAuthRepository';
import IUserDocument from '../../../models/user/interfaces/IUser';
import IBaseRepository from '../../base/interfaces/IBaseRepository';
import BaseRepository from '../../base/implementation/BaseRepository';
import { UserModel } from '../../../models/user/model/user.model';

export default class AuthRepository implements IAuthRepository {
    private baseRepo: IBaseRepository<IUserDocument> = new BaseRepository<IUserDocument>(UserModel);

    async createUser(data: Partial<IUserDocument>): Promise<IUserDocument> {
        try {
            const user = await this.baseRepo.create(data);

            return user;
        } catch (error) {
            throw new Error(`${(error as Error).message}`);
        }
    }

    async checkUserExist(email: string): Promise<IUserDocument | null> {
        try {
            const user = await this.baseRepo.findOne({ email });

            return user;
        } catch (error) {
            throw new Error(`${(error as Error).message}`);
        }
    }

    async getUserDetails(user_id: string): Promise<IUserDocument> {
        try {
            const result = await this.baseRepo.findById(user_id);

            if (!result) {
                throw new Error(`User with ID ${user_id} not found`);
            }
            
            return result;
        } catch (error) {
            throw new Error(`${(error as Error).message}`);
        }
    }
}
