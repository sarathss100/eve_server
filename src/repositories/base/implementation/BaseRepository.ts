import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';
import IBaseRepository from '../interface/IBaseRepository';

class BaseRepository<T extends Document> implements IBaseRepository<T> {
    protected _model: Model<T>;

    public constructor(model: Model<T>) {
        this._model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        return this._model.create(data);
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return this._model.findOne(filter).exec();
    }

    async findById(_id: string): Promise<T | null> {
        return this._model.findById(_id);
    }

    async find(filter: FilterQuery<T>): Promise<T[]> {
        return this._model.find(filter).exec();
    }

    async findAll(): Promise<T[]> {
        return this._model.find().sort({ createdAt: -1 }).exec();
    }

    async updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
        return this._model.findOneAndUpdate(filter, update, { new: true });
    }

    async updateMany(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<{ acknowledged: boolean; modifiedCount: number }> {
        return this._model.updateMany(filter, update).exec();
    }

    async deleteOne(filter: FilterQuery<T>): Promise<T | null> {
        return this._model.findOneAndDelete(filter).exec();
    }

    async deleteMany(filter: FilterQuery<T>): Promise<{ acknowledged: boolean; deletedCount: number }> {
        return this._model.deleteMany(filter).exec();
    }
}

export default BaseRepository;