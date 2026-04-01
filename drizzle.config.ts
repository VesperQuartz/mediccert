import { env } from "@/env/server";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./src/repo/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
