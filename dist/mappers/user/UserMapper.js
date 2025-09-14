"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class UserMapper {
    // Maps IUserDocument (Mongo model) to IUserDTO
    static toIUserDTO(data) {
        const dto = {
            user_id: data._id.toString(),
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            role: data.role,
            password: data.password,
            joined_date: data.createdAt,
        };
        return dto;
    }
    // Maps an array of IUserDocument to an array of IUserDTO
    static toDTOs(users) {
        return users.map((user) => this.toIUserDTO(user));
    }
    // Maps IUserDTO to Partial<IUserDocument> (for create/update)
    static toModel(data) {
        const model = {
            _id: data.user_id,
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            role: data.role,
            password: data.password,
        };
        if (data.user_id) {
            model._id = new mongoose_1.Types.ObjectId(data.user_id);
        }
        return model;
    }
}
exports.default = UserMapper;
