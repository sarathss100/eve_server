"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninSchema = void 0;
const zod_1 = require("zod");
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.email({ message: "Invalid email address" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});
