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
const responseHandler_1 = require("../../../utils/responseHandler");
const statusCodes_1 = require("../../../constants/statusCodes");
const successMessages_1 = require("../../../constants/successMessages");
const AppError_1 = require("../../../error/AppError");
class PaymentController {
    constructor(paymentService) {
        this._paymentService = paymentService;
    }
    initiatePayment(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accessToken } = request.cookies;
                const paymentData = request.body;
                const checkoutUrl = yield this._paymentService.initiatePayment(accessToken, paymentData);
                (0, responseHandler_1.sendSuccessResponse)(response, statusCodes_1.StatusCodes.CREATED, successMessages_1.SuccessMessages.OPERATION_SUCCESS, Object.assign({}, checkoutUrl));
            }
            catch (error) {
                (0, AppError_1.handleControllerError)(response, error);
            }
        });
    }
}
exports.default = PaymentController;
