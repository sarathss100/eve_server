import { UserModel } from '../../../models/user/model/user.model'; 
import IUserDocument from '../../../models/user/interfaces/IUser';
import BaseRepository from '../../base/implementation/BaseRepository';
import IBaseRepository from '../../base/interface/IBaseRepository';
import IOrganizerRepository from '../interface/IOrganizerRepository';

export default class OrganizerRepository implements IOrganizerRepository {
    private baseRepo: IBaseRepository<IUserDocument> = new BaseRepository<IUserDocument>(UserModel);

    async toggleUserRole(_id: string, new_role: string): Promise<IUserDocument | null> {
        try {
            const result = await this.baseRepo.updateOne({ _id }, { $set: { role: new_role } });
            return result;
        } catch (error) {
            throw new Error(`Failed to toggle user role: ${(error as Error).message}`);
        }
    }
}
