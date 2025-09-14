"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    constructor(model) {
        this._model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.create(data);
        });
    }
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.findOne(filter).exec();
        });
    }
    findById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.findById(_id);
        });
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.find(filter).exec();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.find().sort({ createdAt: -1 }).exec();
        });
    }
    updateOne(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.findOneAndUpdate(filter, update, { new: true });
        });
    }
    updateMany(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.updateMany(filter, update).exec();
        });
    }
    deleteOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.findOneAndDelete(filter).exec();
        });
    }
    deleteMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.deleteMany(filter).exec();
        });
    }
}
exports.default = BaseRepository;
