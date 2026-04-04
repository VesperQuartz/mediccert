import { createId } from "@paralleldrive/cuid2";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const todo = pgTable("todo", {
  id: integer(),
});

export const certificate = pgTable("certificate", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  certNo: text("cert_no").notNull(),
  firstName: text("first_name").notNull(),
  surname: text("surname").notNull(),
  contractorCompanyName: text("contractor_company_name").notNull(),
  position: text("position").notNull(),
  location: text("location").notNull(),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
});
