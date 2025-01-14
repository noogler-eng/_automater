"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validInputSignup = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string(),
    imageUrl: zod_1.z.string().optional(),
    password: zod_1.z.string()
});
exports.default = validInputSignup;
