import { Config, defineConfig } from "drizzle-kit";
import { env } from "./src/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/entity/*",
  out: "./src/drizzle/migrations",
  dbCredentials: { url: env.POSTGRES_URL },
} satisfies Config);
