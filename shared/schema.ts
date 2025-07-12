import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  serviceType: text("service_type"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const serviceRequests = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  serviceCategory: text("service_category").notNull(),
  serviceType: text("service_type").notNull(),
  details: text("details"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  phone: true,
  message: true,
  serviceType: true,
});

export const insertServiceRequestSchema = createInsertSchema(serviceRequests).pick({
  name: true,
  phone: true,
  email: true,
  serviceCategory: true,
  serviceType: true,
  details: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;
export type ServiceRequest = typeof serviceRequests.$inferSelect;
