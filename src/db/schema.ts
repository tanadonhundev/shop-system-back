import { mysqlTable, serial, varchar, int, timestamp } from "drizzle-orm/mysql-core";

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: int("price").notNull(),
  stock: int("stock").notNull(),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull(),
  total: int("total").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = mysqlTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: int("order_id").notNull(),
  productId: int("product_id").notNull(),
  qty: int("qty").notNull(),
  price: int("price").notNull(),
});
