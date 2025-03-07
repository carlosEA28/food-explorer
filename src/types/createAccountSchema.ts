import z from "zod";

export const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "password must be atleast 8 digits"),
  role: z.string().optional(),
});
