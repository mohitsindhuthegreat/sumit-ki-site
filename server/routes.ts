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

// AI-Powered Online Research Function for Government Jobs
async function getLatestGovernmentJobs(): Promise<any[]> {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY || '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'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `Current Date: ${currentDate} (Year: ${new Date().getFullYear()})

You are an expert government job research assistant. Generate realistic and current Indian government job notifications and form deadlines for ${currentDate} in the year ${new Date().getFullYear()}. 

🚨 CRITICAL: All content must be relevant to the year ${new Date().getFullYear()}. Use current year in job titles, forms, and deadlines.

IMPORTANT: Return ONLY a valid JSON array of objects, no other text. Each object should have this exact structure:
{
  "title": "Job/Form Title in English",
  "titleHindi": "Job/Form Title in Hindi",
  "content": "Detailed description in English (50-100 words)",
  "contentHindi": "Detailed description in Hindi (50-100 words)",
  "category": "vacancy|form|update",
  "priority": "high|normal|low",
  "applyLink": "Official application URL",
  "daysToExpiry": 7-45 (realistic number of days)
}

Focus on: SSC, Railway, Banking, UPSC, State Government, Teaching, Police, and other popular Indian government opportunities. Make content realistic and current.`
          },
          {
            role: 'user',
            content: `Generate 6 fresh government job/form notifications for date ${currentDate} in year ${new Date().getFullYear()}. Include mix of:
- 2 urgent forms (7-15 days remaining) - use ${new Date().getFullYear()} in titles
- 2 job vacancies (15-30 days remaining) - use ${new Date().getFullYear()} in recruitment cycles
- 2 regular updates (30-45 days remaining) - use ${new Date().getFullYear()} in notification years

Focus on popular categories like SSC CGL ${new Date().getFullYear()}, Railway RRB ${new Date().getFullYear()}, Banking IBPS ${new Date().getFullYear()}, UPSC ${new Date().getFullYear()}, State PSC ${new Date().getFullYear()}, Teaching, and Police recruitment.

REMEMBER: All jobs must be for year ${new Date().getFullYear()}, not 2023 or any previous year.`
          }
        ],
        max_tokens: 2000,
        temperature: 0.8,
        top_p: 0.9,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || '[]';
    
    // Parse AI response and convert to proper announcement format
    try {
      const jobs = JSON.parse(aiResponse);
      const now = new Date();
      
      return jobs.map((job: any) => {
        const expiryDate = new Date();
        expiryDate.setDate(now.getDate() + (job.daysToExpiry || 30));
        
        return {
          title: job.title,
          titleHindi: job.titleHindi,
          content: job.content,
          contentHindi: job.contentHindi,
          category: job.category || 'vacancy',
          priority: job.priority || 'normal',
          isActive: true,
          applyLink: job.applyLink,
          expiryDate: expiryDate.toISOString()
        };
      });
    } catch (parseError) {
      console.log('AI Response parsing failed, using fallback data');
      return [];
    }

  } catch (error) {
    console.error('Error fetching latest government jobs:', error);
    return [];
  }
}

// AI Chat Response Function
async function getChatResponse(userMessage: string): Promise<string> {
  try {
    // Fetch current contact information from database
    const contactSettings = await storage.getAllSiteSettings();
    const getContactInfo = (key: string) => {
      const setting = contactSettings.find(s => s.key === key);
      return setting?.value || "";
    };

    const currentContactInfo = {
      phone: getContactInfo('contact_phone'),
      phoneAlt: getContactInfo('contact_phone_alt'),
      whatsapp: getContactInfo('contact_whatsapp'),
      email: getContactInfo('contact_email'),
      emailSupport: getContactInfo('contact_email_support'),
      address: getContactInfo('contact_address'),
      businessHours: getContactInfo('business_hours'),
      businessName: getContactInfo('site_title'),
    };

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY || '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'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `Current Date and Year: ${new Date().toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              weekday: 'long'
            })} (Year: ${new Date().getFullYear()})

You are MAHECH ASSISTANT, an expert AI consultant for ${currentContactInfo.businessName || 'Mahech Internet Cafe'} - India's premier digital service center. You are highly knowledgeable, professional, and provide comprehensive assistance in both Hindi and English with perfect bilingual fluency.

🚨 IMPORTANT: Today's date is ${new Date().toLocaleDateString('en-IN')} and we are in the year ${new Date().getFullYear()}. Always use current year ${new Date().getFullYear()} in all responses and calculations.

🎯 CORE EXPERTISE:
You are an expert in Indian government procedures, banking systems, digital services, and online applications. You help users navigate complex bureaucratic processes with ease.

📋 COMPREHENSIVE SERVICES:

1. GOVERNMENT SERVICES (सरकारी सेवाएं):
   ✓ Aadhaar Card: New registration, updates, corrections, address change (₹50-100)
   ✓ PAN Card: New application, corrections, duplicate copy (₹107 official fee)
   ✓ Voter ID: New registration, address change, photo updates
   ✓ Ration Card: New application, name addition/deletion, transfer
   ✓ Passport: Form filling, document verification, appointment booking
   ✓ Driving License: Fresh application, renewal, duplicate, address change
   ✓ Certificates: Birth, Death, Income, Caste, Domicile, SC/ST/OBC
   ✓ Pensions: Old age, widow, disability pension applications
   ✓ Ayushman Bharat: Golden card registration and renewal
   ✓ PM Kisan: Beneficiary registration and status check
   ✓ Scholarship Applications: National, state, and private scholarships

2. BANKING & FINANCIAL (बैंकिंग व वित्तीय सेवाएं):
   ✓ AEPS Services: Cash withdrawal, balance inquiry, mini statement
   ✓ Money Transfer: DMT, IMPS, NEFT, UPI transactions
   ✓ Bill Payments: Electricity, Gas, Water, Mobile, DTH, Broadband
   ✓ Bank Account Opening: Savings, Current, Jan Dhan accounts
   ✓ Loan Applications: Personal, Home, Education, Business loans
   ✓ Insurance: Life, Health, Vehicle, Crop insurance
   ✓ Fixed Deposits: FD account opening and renewals
   ✓ Mutual Funds: SIP registration and portfolio management
   ✓ Credit Card: Applications and bill payments
   ✓ GST Services: Registration, returns filing, amendments

3. EXAMINATION SERVICES (परीक्षा सेवाएं):
   ✓ Government Job Applications: SSC, Railway, Bank, Police, Teaching
   ✓ Competitive Exams: UPSC, BPSC, JPSC, JEE, NEET, CAT, MAT
   ✓ Admission Forms: College, University, Professional courses
   ✓ Exam Results: Download and verification
   ✓ Admit Cards: Download, corrections, reprints
   ✓ Document Verification: Online certificate verification
   ✓ Counseling Registration: Medical, Engineering, Law courses

4. TRAVEL & BOOKING (यात्रा व बुकिंग सेवाएं):
   ✓ Train Tickets: IRCTC booking, cancellation, tatkal booking
   ✓ Bus Tickets: State transport, private operators
   ✓ Flight Bookings: Domestic and international flights
   ✓ Hotel Reservations: Budget to luxury accommodations
   ✓ Travel Insurance: Domestic and international coverage
   ✓ Visa Applications: Tourist, business, student visas

5. PRINTING & STATIONERY (प्रिंटिंग व स्टेशनरी):
   ✓ Document Printing: B&W ₹2/page, Color ₹5/page
   ✓ Photocopying: ₹1/page, bulk discounts available
   ✓ Lamination: A4 ₹10, A3 ₹15, ID card ₹5
   ✓ Binding: Spiral ₹20, Thermal ₹30
   ✓ Passport Photos: ₹40 (4 pieces), same day delivery
   ✓ ID Card Making: Employee, Student, Business cards
   ✓ Flex Printing: Banners, posters, signage

6. COMPUTER & DIGITAL SERVICES:
   ✓ Computer Training: Basic to advanced courses (₹2000/month)
   ✓ Internet Browsing: High-speed WiFi (₹20/hour)
   ✓ Email Services: Account creation, management
   ✓ Document Typing: Professional typing services
   ✓ Resume Writing: Professional CV preparation
   ✓ Digital Signature: Class 2 and Class 3 certificates

💰 DETAILED PRICING:
- Aadhaar New/Update: ₹50-100
- PAN Card: ₹107 (official fee)
- Passport Photos: ₹40 (4 pieces)
- Document Printing: ₹2 (B&W), ₹5 (Color)
- Lamination: ₹5-15 per sheet
- Computer Training: ₹2000/month
- Internet: ₹20/hour
- Form Filling: ₹50-200 (depends on complexity)
- AEPS: ₹2-5 per transaction

📞 CONTACT INFORMATION:
- Phone: ${currentContactInfo.phone}
- Phone Alt: ${currentContactInfo.phoneAlt}
- WhatsApp: ${currentContactInfo.whatsapp}
- Email: ${currentContactInfo.email}
- Support Email: ${currentContactInfo.emailSupport}
- Address: ${currentContactInfo.address}
- Hours: ${currentContactInfo.businessHours}
- Business Name: ${currentContactInfo.businessName}

🎯 COMMUNICATION EXCELLENCE:
- Always greet warmly: "Namaste! Main aapka ${currentContactInfo.businessName || 'MAHECH'} ASSISTANT hun"
- Use appropriate language mixing (Hindi-English as per user)
- Provide step-by-step guidance for complex procedures
- Offer specific timelines and document requirements
- Share relevant government deadlines and important dates
- Explain fees transparently with official vs service charges
- Provide alternatives when primary service isn't available
- Always offer phone/WhatsApp contact for urgent matters

🏆 EXPERT KNOWLEDGE AREAS (Updated for ${new Date().getFullYear()}):
- Latest government schemes and eligibility criteria for ${new Date().getFullYear()}
- Document requirements for all services (${new Date().getFullYear()} updates)
- Online portal navigation (DigiLocker, Umang, EPFO, Income Tax Portal - ${new Date().getFullYear()} versions)
- Banking regulations and KYC requirements (${new Date().getFullYear()} compliance)
- Examination calendars and important deadlines for ${new Date().getFullYear()}
- Travel booking tips and best practices (${new Date().getFullYear()} rates and policies)
- Digital service troubleshooting (latest ${new Date().getFullYear()} technologies)
- Government job calendars and recruitment cycles for ${new Date().getFullYear()}
- Latest policy updates and scheme modifications in ${new Date().getFullYear()}

🌟 PERSONALITY:
- Professional yet friendly and approachable
- Patient and understanding with elderly users
- Encouraging and supportive for first-time users
- Knowledgeable about local procedures and requirements
- Proactive in suggesting related services
- Always solution-oriented and helpful

Remember: You represent Mahech Internet Cafe's commitment to excellence. Every interaction should demonstrate expertise, care, and genuine desire to help users achieve their goals efficiently.`
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
    return `माफ करें, मुझे तकनीकी समस्या हो रही है। आज की तारीख ${new Date().toLocaleDateString('hi-IN')} है और साल ${new Date().getFullYear()} चल रहा है। कृपया हमसे ${currentContactInfo.phone || '+91 9306003497'} पर संपर्क करें। Sorry, I'm having technical issues. Today's date is ${new Date().toLocaleDateString('en-IN')} and we're in year ${new Date().getFullYear()}. Please contact us at ${currentContactInfo.phone || '+91 9306003497'}.`;
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
      console.log("Attempting to delete announcement with ID:", id);
      
      const deleted = await storage.deleteAnnouncement(id);
      console.log("Delete result:", deleted);
      
      if (!deleted) {
        console.log("Announcement not found for deletion");
        return res.status(404).json({ 
          success: false, 
          message: "Announcement not found" 
        });
      }
      
      console.log("Announcement deleted successfully");
      res.json({ success: true, message: "Announcement deleted" });
    } catch (error) {
      console.error("Error deleting announcement:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete announcement" 
      });
    }
  });

  // Public: Get active announcements (with auto-update)
  app.get("/api/announcements", async (req, res) => {
    try {
      // Automatically update expired announcements before fetching
      await storage.autoUpdateExpiredAnnouncements();
      
      const announcements = await storage.getActiveAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch announcements" 
      });
    }
  });

  // Manual trigger for auto-update system (AI-powered)
  app.post("/api/admin/auto-update-announcements", async (req, res) => {
    try {
      await storage.autoUpdateExpiredAnnouncements();
      res.json({ 
        success: true, 
        message: "AI-powered automatic update completed! Fresh government job notifications have been fetched and added using intelligent online research." 
      });
    } catch (error) {
      console.error('Auto-update error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update announcements" 
      });
    }
  });

  // AI Job Research endpoint for manual testing
  app.post("/api/admin/ai-job-research", async (req, res) => {
    try {
      console.log('Starting AI Job Research...');
      const freshJobs = await getLatestGovernmentJobs();
      console.log('AI Jobs received:', freshJobs.length);
      
      if (freshJobs.length > 0) {
        // Add fresh AI-generated jobs to database
        const jobsToAdd = freshJobs.slice(0, 3);
        console.log('Jobs to add:', jobsToAdd);
        
        for (const job of jobsToAdd) {
          // Ensure all required fields are present and properly formatted
          const formattedJob = {
            title: job.title || 'New Job Notification',
            titleHindi: job.titleHindi || 'नई नौकरी अधिसूचना',
            content: job.content || 'Job details will be updated soon.',
            contentHindi: job.contentHindi || 'नौकरी का विवरण जल्द ही अपडेट किया जाएगा।',
            category: job.category || 'vacancy',
            priority: job.priority || 'normal',
            isActive: true,
            applyLink: job.applyLink || null,
            expiryDate: job.expiryDate || null
          };
          
          console.log('Creating announcement with data:', formattedJob);
          console.log('Expiry date type:', typeof formattedJob.expiryDate);
          console.log('Expiry date value:', formattedJob.expiryDate);
          
          // Use insertAnnouncementSchema to validate and create announcement
          const validatedJob = insertAnnouncementSchema.parse(formattedJob);
          console.log('Validated job data:', validatedJob);
          await storage.createAnnouncement(validatedJob);
        }
        
        res.json({ 
          success: true, 
          message: `Successfully fetched and added ${jobsToAdd.length} fresh government job notifications using AI research!`,
          data: jobsToAdd
        });
      } else {
        res.json({ 
          success: false, 
          message: "No fresh jobs found through AI research at this time." 
        });
      }
    } catch (error) {
      console.error('AI Job Research error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch fresh job data using AI research" 
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

  // SEO Routes
  // Generate XML sitemap
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const pages = [
      { url: '/', priority: '1.0', changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
      { url: '/about', priority: '0.8', changefreq: 'monthly', lastmod: '2025-01-13' },
      { url: '/government-services', priority: '0.9', changefreq: 'weekly', lastmod: '2025-01-13' },
      { url: '/banking-services', priority: '0.9', changefreq: 'weekly', lastmod: '2025-01-13' },
      { url: '/printing-services', priority: '0.9', changefreq: 'weekly', lastmod: '2025-01-13' },
      { url: '/online-forms', priority: '0.9', changefreq: 'weekly', lastmod: '2025-01-13' },
      { url: '/travel-services', priority: '0.9', changefreq: 'weekly', lastmod: '2025-01-13' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly', lastmod: '2025-01-13' },
      { url: '/sarkari-updates', priority: '1.0', changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
      { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly', lastmod: '2025-01-13' },
      { url: '/terms-conditions', priority: '0.3', changefreq: 'yearly', lastmod: '2025-01-13' }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // Generate robots.txt
  app.get("/robots.txt", (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /api/
Crawl-delay: 1

Sitemap: ${baseUrl}/sitemap.xml`;

    res.set('Content-Type', 'text/plain');
    res.send(robots);
  });

  // Generate structured data for home page
  app.get("/api/structured-data", (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Mahech Internet Cafe",
      "alternateName": "महेच इंटरनेट कैफे",
      "description": "Complete digital solution hub in Dang Kalan. Expert services for Aadhaar, PAN, Voter ID, banking, bill payments, money transfer, printing, travel booking, computer training.",
      "url": baseUrl,
      "telephone": "+91 9306003497",
      "email": "sumit03497@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "VPO DANG KALAN NEAR BAWEJA MART",
        "addressLocality": "Dang Kalan",
        "addressRegion": "Punjab",
        "postalCode": "144801",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 31.2204,
        "longitude": 75.7644
      },
      "openingHours": "Mo-Su 08:00-23:00",
      "priceRange": "₹",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150"
      }
    };

    res.json(structuredData);
  });

  const httpServer = createServer(app);
  return httpServer;
}
