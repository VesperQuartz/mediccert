import "dotenv/config";
import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import { env } from "@/env/server";
import * as authschema from "@/repo/schema/auth.schema";
import * as schema from "@/repo/schema/schema";

neonConfig.webSocketConstructor = ws;

const sql = new Pool({
  connectionString: String(env.DATABASE_URL),
});

export const db = drizzle({
  client: sql,
  logger: true,
  schema: { ...schema, ...authschema },
});

export type Db = typeof db;
