"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createTicketRouter = function (ticketController) {
    const router = (0, express_1.Router)();
    router.post('/tickets', ticketController.generateTicket.bind(ticketController));
    router.get('/', ticketController.getTickets.bind(ticketController));
    return router;
};
exports.default = createTicketRouter;
