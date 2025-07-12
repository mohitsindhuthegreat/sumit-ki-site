import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertServiceRequestSchema, 
  insertAnnouncementSchema, 
  insertSiteSettingSchema,
  loginSchema 
} from "@shared/schema";
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

  // Admin authentication endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password || user.role !== "admin") {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
      }

      // In a real app, you'd generate a JWT token here
      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          username: user.username, 
          role: user.role 
        },
        message: "Login successful" 
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        message: "Invalid request data" 
      });
    }
  });

  // Admin: Get all contact messages
  app.get("/api/admin/contact-messages", async (req, res) => {
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

  // Admin: Get all service requests
  app.get("/api/admin/service-requests", async (req, res) => {
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

  // Admin: Update service request status
  app.patch("/api/admin/service-request/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      const updated = await storage.updateServiceRequestStatus(id, status);
      if (!updated) {
        return res.status(404).json({ 
          success: false, 
          message: "Service request not found" 
        });
      }
      
      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to update service request" 
      });
    }
  });

  // Admin: Create announcement
  app.post("/api/admin/announcements", async (req, res) => {
    try {
      const announcementData = insertAnnouncementSchema.parse(req.body);
      const announcement = await storage.createAnnouncement(announcementData);
      res.json({ success: true, data: announcement });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid announcement data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create announcement" 
        });
      }
    }
  });

  // Admin: Get all announcements
  app.get("/api/admin/announcements", async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch announcements" 
      });
    }
  });

  // Admin: Update announcement
  app.patch("/api/admin/announcements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      const updated = await storage.updateAnnouncement(id, updateData);
      if (!updated) {
        return res.status(404).json({ 
          success: false, 
          message: "Announcement not found" 
        });
      }
      
      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to update announcement" 
      });
    }
  });

  // Admin: Delete announcement
  app.delete("/api/admin/announcements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteAnnouncement(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          message: "Announcement not found" 
        });
      }
      
      res.json({ success: true, message: "Announcement deleted" });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete announcement" 
      });
    }
  });

  // Public: Get active announcements
  app.get("/api/announcements", async (req, res) => {
    try {
      const announcements = await storage.getActiveAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch announcements" 
      });
    }
  });

  // Admin: Site settings
  app.get("/api/admin/site-settings", async (req, res) => {
    try {
      const settings = await storage.getAllSiteSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch site settings" 
      });
    }
  });

  app.post("/api/admin/site-settings", async (req, res) => {
    try {
      const settingData = insertSiteSettingSchema.parse(req.body);
      const setting = await storage.setSiteSetting(settingData);
      res.json({ success: true, data: setting });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid setting data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to save setting" 
        });
      }
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}
