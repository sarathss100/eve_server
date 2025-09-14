"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentRepository_1 = __importDefault(require("../../../repositories/payments/implementation/PaymentRepository"));
const PaymentService_1 = __importDefault(require("../../../services/payments/implementation/PaymentService"));
const PaymentController_1 = __importDefault(require("../../../controllers/payment/implementation/PaymentController"));
const PaymentRouter_1 = __importDefault(require("./PaymentRouter"));
class PaymentContainer {
    constructor() {
        const repository = new PaymentRepository_1.default();
        const service = new PaymentService_1.default(repository);
        this.controller = new PaymentController_1.default(service);
        this.router = (0, PaymentRouter_1.default)(this.controller);
    }
}
exports.default = PaymentContainer;
