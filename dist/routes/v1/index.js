"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthContainer_1 = __importDefault(require("./auth/AuthContainer"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const UserRole_1 = require("../../types/UserRole");
const OrganizerContainer_1 = __importDefault(require("./organizer/OrganizerContainer"));
const EventsContainer_1 = __importDefault(require("./events/EventsContainer"));
const PaymentContainer_1 = __importDefault(require("./payment/PaymentContainer"));
const TicketContainer_1 = __importDefault(require("./ticket/TicketContainer"));
const apiV1Router = (0, express_1.Router)();
const authContainer = new AuthContainer_1.default();
const organizerContainer = new OrganizerContainer_1.default();
const eventContainer = new EventsContainer_1.default();
const paymentContainer = new PaymentContainer_1.default();
const ticketContainer = new TicketContainer_1.default();
// Public routes
apiV1Router.use('/auth', authContainer.router);
apiV1Router.use('/events', eventContainer.router);
// Protected routes
apiV1Router.use('/payments', (0, authMiddleware_1.authorizeRoles)(UserRole_1.UserRole.ATTENDEE, UserRole_1.UserRole.ORGANIZER), paymentContainer.router);
apiV1Router.use('/tickets', (0, authMiddleware_1.authorizeRoles)(UserRole_1.UserRole.ATTENDEE, UserRole_1.UserRole.ORGANIZER), ticketContainer.router);
// Organizer-only routes
apiV1Router.use('/organizer', (0, authMiddleware_1.authorizeRoles)(UserRole_1.UserRole.ORGANIZER), organizerContainer.router);
exports.default = apiV1Router;
