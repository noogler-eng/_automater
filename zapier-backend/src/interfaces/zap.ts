import {z} from "zod";

const zapObject = z.object({
    userId: z.string(),
    availabelTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionsId: z.string(),
        actionMetadata: z.any().optional()
    })),
}) 

export default zapObject