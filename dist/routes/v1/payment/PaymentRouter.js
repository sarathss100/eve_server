"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createPayemntRouter = function (paymentController) {
    const router = (0, express_1.Router)();
    router.post('/initiate', paymentController.initiatePayment.bind(paymentController));
    return router;
};
exports.default = createPayemntRouter;
