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

// AI Chat Response Function
async function getChatResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY || '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'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant for Mahech Internet Cafe, a comprehensive digital service center in India. You provide assistance in both Hindi and English. Your knowledge includes:

SERVICES PROVIDED:
1. Government Services (सरकारी सेवाएं):
   - Aadhaar Card services (आधार कार्ड सेवाएं)
   - PAN Card application and updates
   - Voter ID card services
   - Ration card services
   - Birth/Death certificates
   - Income certificates
   - Caste certificates
   - Domicile certificates

2. Banking & Financial Services (बैंकिंग सेवाएं):
   - AEPS (Aadhaar Enabled Payment System)
   - Money transfer services
   - Bill payments (electricity, gas, mobile recharge)
   - Bank account opening assistance
   - Loan application support
   - Insurance services

3. Online Forms & Applications (ऑनलाइन फॉर्म सेवाएं):
   - Government job applications
   - Scholarship applications
   - Exam form filling
   - Admit card downloads
   - Result checking services
   - Online document verification

4. Travel & Booking Services (यात्रा सेवाएं):
   - Train ticket booking (IRCTC)
   - Bus ticket booking
   - Flight bookings
   - Hotel reservations
   - Travel insurance

5. Printing & Stationery (प्रिंटिंग सेवाएं):
   - Document printing (black & white: ₹2/page, color: ₹5/page)
   - Photocopying services
   - Lamination services
   - Binding services
   - Passport size photos

6. Computer & Internet Services:
   - Computer training
   - Internet browsing
   - Email services
   - Document typing

PRICING:
- Aadhaar services: ₹50-100
- PAN card: ₹107
- Passport photos: ₹40 (4 pieces)
- Printing: ₹2/page (B&W), ₹5/page (Color)
- Computer training: ₹2000/month
- Internet: ₹20/hour

CONTACT INFO:
- Phone: +91 98765 43210
- Address: Main Market, Near Bus Stand
- Hours: 9 AM - 9 PM (Mon-Sat)
- Email: info@mahechcafe.com

RESPONSE GUIDELINES:
- Be friendly and professional
- Respond in the same language as the user (Hindi/English)
- Provide specific pricing and service details
- Offer to help with form filling or applications
- If unsure about something, suggest visiting the center
- Always offer phone contact for urgent matters
- Use both Hindi and English terms when appropriate
- Be knowledgeable about government schemes and deadlines
- Help users understand complex procedures in simple terms

Remember: You're an expert in Indian government services, banking, and digital services. Help users navigate these services efficiently.`
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "माफ करें, मुझे समझने में कुछ समस्या हो रही है। कृपया अपना प्रश्न दोबारा पूछें।";
  } catch (error) {
    console.error('Groq API error:', error);
    return "माफ करें, मुझे तकनीकी समस्या हो रही है। कृपया हमसे +91 98765 43210 पर संपर्क करें। Sorry, I'm having technical issues. Please contact us at +91 98765 43210.";
  }
}

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
      console.log("Parsed announcement data:", announcementData);
      const announcement = await storage.createAnnouncement(announcementData);
      res.json({ success: true, data: announcement });
    } catch (error) {
      console.error("Error creating announcement:", error);
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
      
      // Convert expiryDate string to Date object if it exists
      if (updateData.expiryDate && typeof updateData.expiryDate === 'string') {
        updateData.expiryDate = new Date(updateData.expiryDate);
      }
      
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

  app.put("/api/admin/site-settings/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      
      const settingData = { key, value };
      const setting = await storage.setSiteSetting(settingData);
      res.json({ success: true, data: setting });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to update setting" 
      });
    }
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Message is required" 
        });
      }

      const response = await getChatResponse(message);
      res.json({ success: true, response });
    } catch (error) {
      console.error('Chat API error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get response from AI" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
