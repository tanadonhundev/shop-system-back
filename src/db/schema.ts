import { sql } from "drizzle-orm";
import { mysqlTable, serial, varchar, int, timestamp, decimal, mysqlEnum, primaryKey, text } from "drizzle-orm/mysql-core";

export const product = mysqlTable(
  "products",
  {
    id: int().primaryKey().autoincrement().notNull(),
    title: varchar({ length: 255 }).notNull(),
    price: decimal({ precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`(now())`
    ),
  },
  (table) => [primaryKey({ columns: [table.id], name: "product_id" })]
);

export const productImage = mysqlTable(
  "product_image",
  {
    id: int().autoincrement().notNull(),
    productId: int("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    imageName: text("image_name").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`(now())`
    ),
  },
  (table) => [primaryKey({ columns: [table.id], name: "product_image_id" })]
);

export const order = mysqlTable(
  "order",
  {
    id: int().autoincrement().notNull(),
    userId: varchar("user_id", { length: 36 })
      .notNull(),
    productId: int("product_id")
      .notNull()
      .references(() => product.id),
    price: decimal({ precision: 10, scale: 2 }).notNull(),
    qty: int({ unsigned: true }).notNull(),
    status: mysqlEnum(["pending", "paid", "delivered"]),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`(now())`
    ),
  },
  (table) => [primaryKey({ columns: [table.id], name: "order_id" })]
);
