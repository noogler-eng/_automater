"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zapObject = zod_1.z.object({
    userId: zod_1.z.string(),
    availabelTriggerId: zod_1.z.string(),
    triggerMetadata: zod_1.z.any().optional(),
    actions: zod_1.z.array(zod_1.z.object({
        availableActionsId: zod_1.z.string(),
        actionMetadata: zod_1.z.any().optional()
    })),
});
exports.default = zapObject;
