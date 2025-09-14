"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createAuthRouter = function (authController) {
    const router = (0, express_1.Router)();
    router.post('/register', authController.registerUser.bind(authController));
    router.post('/signin', authController.signin.bind(authController));
    router.post('/signout', authController.signout.bind(authController));
    return router;
};
exports.default = createAuthRouter;
