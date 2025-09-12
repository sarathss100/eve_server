import mongoose, { Model } from "mongoose";
import IUserDocument from "../interfaces/IUser";
import UserSchema from "../schema/user.schema";

export const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>('Users', UserSchema);