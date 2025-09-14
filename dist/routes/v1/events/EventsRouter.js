"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createEventRouter = function (eventController) {
    const router = (0, express_1.Router)();
    router.get('/', eventController.getAllEvents.bind(eventController));
    router.get('/:id', eventController.getEvent.bind(eventController));
    return router;
};
exports.default = createEventRouter;
