"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createOrganizerRouter = function (organizerController) {
    const router = (0, express_1.Router)();
    router.get('/users', organizerController.getAllUsers.bind(organizerController));
    router.put('/users/role/:id', organizerController.toggleUserRole.bind(organizerController));
    router.post('/event', organizerController.createEvent.bind(organizerController));
    router.patch('/event', organizerController.updateEvent.bind(organizerController));
    router.delete('/event/:id', organizerController.deleteEvent.bind(organizerController));
    router.get('/events', organizerController.getAllEvents.bind(organizerController));
    router.get('/tickets', organizerController.getAllTickets.bind(organizerController));
    return router;
};
exports.default = createOrganizerRouter;
