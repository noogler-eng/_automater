import { z } from "zod";

const validInputSignup = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    imageUrl: z.string().optional(),
    password: z.string()
})


export default validInputSignup