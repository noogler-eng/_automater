import { z } from "zod";

const validInputSignin = z.object({
    email: z.string(),
    password: z.string()
})

export default validInputSignin;