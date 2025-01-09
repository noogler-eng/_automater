"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zapObject = zod_1.z.object({
    userId: zod_1.z.string(),
    // availabelTriggerId is avaible triggers like google docs, google sheet ...
    availabelTriggerId: zod_1.z.string(),
    // availabelTrigger's metadata like user's userid or something which will used in google sheet ...
    triggerMetadata: zod_1.z.any().optional(),
    // what actions i have to performed like there are available actions also
    // actions metadata contains what can be used in performing actions
    actions: zod_1.z.array(zod_1.z.object({
        availableActionsId: zod_1.z.string(),
        actionMetadata: zod_1.z.any().optional()
    })),
});
exports.default = zapObject;
// {
//     "userId": "1",
//     "availabelTriggerId": "webhook",
//     "triggerMetadata": [],
//     "actions": [{
//         "availableActionsId": "email",
//         "actionMetadata": []
//     }]
// }
