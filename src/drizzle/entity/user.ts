import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { uuid, text, timestamp, doublePrecision } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("userId").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").unique(),
  password: text("password").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(user, ({ many }) => ({
  favorites: many(food),
}));

export const food = pgTable("food", {
  id: uuid("foodId").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  imgUrl: text("imgUrl").notNull(),
  price: doublePrecision("price").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  ingredients: text("ingredients").array().notNull(),
});

export const foodRelations = relations(food, ({ one }) => ({
  user: one(user, {
    fields: [food.id],
    references: [user.id],
  }),
}));
