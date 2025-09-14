"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const payment_schema_1 = __importDefault(require("../schema/payment.schema"));
exports.PaymentModel = mongoose_1.default.model('Payments', payment_schema_1.default);
