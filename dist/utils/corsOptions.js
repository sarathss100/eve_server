"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions = {
    origin: [`${process.env.FROND_END_URL}`],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
};
exports.default = corsOptions;
