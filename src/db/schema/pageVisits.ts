import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const pageVisitsTable = pgTable("page_visits", {
  id: serial("id").primaryKey(),
  page: text("page").notNull(),
  referrer: text("referrer"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
