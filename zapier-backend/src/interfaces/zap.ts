import {z} from "zod";

const zapObject = z.object({
    userId: z.string(),
    // availabelTriggerId is avaible triggers like google docs, google sheet ...
    availabelTriggerId: z.string(),
    // availabelTrigger's metadata like user's userid or something which will used in google sheet ...
    triggerMetadata: z.any().optional(),
    // what actions i have to performed like there are available actions also
    // actions metadata contains what can be used in performing actions
    actions: z.array(z.object({
        availableActionsId: z.string(),
        actionMetadata: z.any().optional()
    })),
}) 

export default zapObject


// {
//     "userId": "1",
//     "availabelTriggerId": "webhook",
//     "triggerMetadata": [],
//     "actions": [{
//         "availableActionsId": "email",
//         "actionMetadata": []
//     }]
// }