import { users, contactMessages, serviceRequests, type User, type InsertUser, type ContactMessage, type InsertContactMessage, type ServiceRequest, type InsertServiceRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
  getServiceRequests(): Promise<ServiceRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private serviceRequests: Map<number, ServiceRequest>;
  private currentUserId: number;
  private currentMessageId: number;
  private currentRequestId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.serviceRequests = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    this.currentRequestId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      serviceType: insertMessage.serviceType || null,
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createServiceRequest(insertRequest: InsertServiceRequest): Promise<ServiceRequest> {
    const id = this.currentRequestId++;
    const request: ServiceRequest = { 
      ...insertRequest, 
      id, 
      email: insertRequest.email || null,
      details: insertRequest.details || null,
      status: "pending",
      createdAt: new Date() 
    };
    this.serviceRequests.set(id, request);
    return request;
  }

  async getServiceRequests(): Promise<ServiceRequest[]> {
    return Array.from(this.serviceRequests.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
