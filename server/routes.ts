import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertServiceRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(contactData);
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message" 
        });
      }
    }
  });

  // Get contact messages endpoint (for admin use)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch messages" 
      });
    }
  });

  // Service request submission endpoint
  app.post("/api/service-request", async (req, res) => {
    try {
      const requestData = insertServiceRequestSchema.parse(req.body);
      const serviceRequest = await storage.createServiceRequest(requestData);
      res.json({ success: true, message: "Service request submitted successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid request data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit service request" 
        });
      }
    }
  });

  // Get service requests endpoint (for admin use)
  app.get("/api/service-requests", async (req, res) => {
    try {
      const requests = await storage.getServiceRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch service requests" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
