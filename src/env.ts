import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  REDIS_URL: z.string().url(),
  POSTGRES_URL: z.string().url(),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
