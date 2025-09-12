import { Types } from 'mongoose';
import IUserDTO from '../../dtos/user/IUserDTO';
import IUserDocument from '../../models/user/interfaces/IUser';

export default class UserMapper {
  // Maps IUserDocument (Mongo model) to IUserDTO
  static toIUserDTO(data: IUserDocument): IUserDTO {
    const dto: IUserDTO = {
      user_id: data._id.toString(),
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      role: data.role,
      password: data.password,
    };

    return dto;
  }

  // Maps an array of IUserDocument to an array of IUserDTO
  static toDTOs(users: IUserDocument[]): IUserDTO[] {
    return users.map((user) => this.toIUserDTO(user));
  }

  // Maps IUserDTO to Partial<IUserDocument> (for create/update)
  static toModel(data: Partial<IUserDTO>): Partial<IUserDocument> {
    const model: Partial<IUserDocument> = {
      _id: data.user_id,
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      role: data.role,
      password: data.password,
    };

    if (data.user_id) {
      model._id = new Types.ObjectId(data.user_id);
    }

    return model;
  }
}
