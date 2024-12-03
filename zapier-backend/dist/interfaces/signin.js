"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validInputSignin = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.default = validInputSignin;
