import { 
  users, 
  contactMessages, 
  serviceRequests, 
  announcements, 
  siteSettings,
  type User, 
  type InsertUser, 
  type ContactMessage, 
  type InsertContactMessage, 
  type ServiceRequest, 
  type InsertServiceRequest,
  type Announcement,
  type InsertAnnouncement,
  type SiteSetting,
  type InsertSiteSetting 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gt } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
  getServiceRequests(): Promise<ServiceRequest[]>;
  updateServiceRequestStatus(id: number, status: string): Promise<ServiceRequest | undefined>;
  
  // Admin functionality
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  getAnnouncements(): Promise<Announcement[]>;
  getActiveAnnouncements(): Promise<Announcement[]>;
  updateAnnouncement(id: number, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined>;
  deleteAnnouncement(id: number): Promise<boolean>;
  
  // Site settings
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  setSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting>;
  getAllSiteSettings(): Promise<SiteSetting[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private serviceRequests: Map<number, ServiceRequest>;
  private announcements: Map<number, Announcement>;
  private siteSettings: Map<string, SiteSetting>;
  private currentUserId: number;
  private currentMessageId: number;
  private currentRequestId: number;
  private currentAnnouncementId: number;
  private currentSettingId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.serviceRequests = new Map();
    this.announcements = new Map();
    this.siteSettings = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    this.currentRequestId = 1;
    this.currentAnnouncementId = 1;
    this.currentSettingId = 1;
    
    // Create default admin user
    this.createDefaultAdmin();
    
    // Initialize default contact settings
    this.initializeDefaultSettings();
  }

  private createDefaultAdmin() {
    const adminUser: User = {
      id: this.currentUserId++,
      username: "sumit",
      password: "1",
      role: "admin",
      isActive: true,
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);
    
    // Add sample announcements
    this.createSampleAnnouncements();
  }

  private createSampleAnnouncements() {
    const sampleAnnouncements = [
      {
        title: "Latest Government Job Notifications 2025",
        titleHindi: "नवीनतम सरकारी नौकरी अधिसूचनाएं 2025",
        content: "New government job openings in Railway, Banking, SSC, and UPSC sectors. Apply now for various positions including clerk, officer, and technical roles with competitive packages.",
        contentHindi: "रेलवे, बैंकिंग, SSC और UPSC क्षेत्रों में नई सरकारी नौकरी के अवसर। प्रतिस्पर्धी पैकेज के साथ क्लर्क, अधिकारी और तकनीकी भूमिकाओं के लिए आवेदन करें।",
        category: "vacancy",
        priority: "high",
        isActive: true,
        applyLink: "https://ssc.nic.in/apply",
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
      {
        title: "Online Form Submission Service - New Features Added",
        titleHindi: "ऑनलाइन फॉर्म सबमिशन सेवा - नई सुविधाएं जोड़ी गई",
        content: "We've added new features to our online form submission service including auto-fill, document upload, and real-time status tracking. Visit our center for assistance.",
        contentHindi: "हमने अपनी ऑनलाइन फॉर्म सबमिशन सेवा में नई सुविधाएं जोड़ी हैं जिसमें ऑटो-फिल, दस्तावेज अपलोड और रियल-टाइम स्टेटस ट्रैकिंग शामिल है।",
        category: "form",
        priority: "normal",
        isActive: true,
        expiryDate: null,
      },
      {
        title: "Income Tax Return Filing - Last Date Extended",
        titleHindi: "आयकर रिटर्न फाइलिंग - अंतिम तिथि बढ़ाई गई",
        content: "The last date for filing Income Tax Returns has been extended to March 31st, 2025. Get professional help at our center with expert guidance and quick processing.",
        contentHindi: "आयकर रिटर्न फाइलिंग की अंतिम तिथि 31 मार्च, 2025 तक बढ़ा दी गई है। विशेषज्ञ मार्गदर्शन और त्वरित प्रसंस्करण के साथ हमारे केंद्र पर पेशेवर सहायता प्राप्त करें।",
        category: "notice",
        priority: "high",
        isActive: true,
        expiryDate: new Date('2025-03-31'),
      },
      {
        title: "Digital Banking Services Now Available",
        titleHindi: "डिजिटल बैंकिंग सेवाएं अब उपलब्ध",
        content: "We now offer comprehensive digital banking services including UPI payments, bank transfers, account opening assistance, and loan application support.",
        contentHindi: "हम अब व्यापक डिजिटल बैंकिंग सेवाएं प्रदान करते हैं जिसमें UPI भुगतान, बैंक ट्रांसफर, खाता खोलने की सहायता और लोन आवेदन समर्थन शामिल है।",
        category: "update",
        priority: "normal",
        isActive: true,
        expiryDate: null,
      },
      {
        title: "Aadhaar Card Update Services - Special Discount",
        titleHindi: "आधार कार्ड अपडेट सेवाएं - विशेष छूट",
        content: "Get your Aadhaar card updated with latest information. Special discount of 20% on all Aadhaar services this month including name change, address update, and mobile number linking.",
        contentHindi: "अपने आधार कार्ड को नवीनतम जानकारी के साथ अपडेट करवाएं। इस महीने सभी आधार सेवाओं पर 20% की विशेष छूट जिसमें नाम परिवर्तन, पता अपडेट और मोबाइल नंबर लिंकिंग शामिल है।",
        category: "news",
        priority: "normal",
        isActive: true,
        expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      }
    ];

    sampleAnnouncements.forEach((announcement) => {
      const id = this.currentAnnouncementId++;
      const announcementData: Announcement = {
        ...announcement,
        id,
        titleHindi: announcement.titleHindi || null,
        contentHindi: announcement.contentHindi || null,
        priority: announcement.priority || "normal",
        isActive: announcement.isActive !== undefined ? announcement.isActive : true,
        applyLink: announcement.applyLink || null,
        expiryDate: announcement.expiryDate || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.announcements.set(id, announcementData);
    });
  }

  private initializeDefaultSettings() {
    const defaultSettings = [
      {
        key: "contact_phone",
        value: "+91 98765 43210",
        description: "Primary contact phone number"
      },
      {
        key: "contact_phone_alt",
        value: "+91 87654 32109",
        description: "Alternative contact phone number"
      },
      {
        key: "contact_whatsapp",
        value: "+91 98765 43210",
        description: "WhatsApp contact number"
      },
      {
        key: "contact_email",
        value: "info@mahechcafe.com",
        description: "Primary contact email"
      },
      {
        key: "contact_email_support",
        value: "support@mahechcafe.com",
        description: "Support email address"
      },
      {
        key: "contact_address",
        value: "Shop No. 123, Main Market\nNear City Center Mall\nNew Delhi - 110001",
        description: "Business address"
      },
      {
        key: "contact_address_hindi",
        value: "दुकान नंबर 123, मुख्य बाजार\nसिटी सेंटर मॉल के पास\nनई दिल्ली - 110001",
        description: "Business address in Hindi"
      },
      {
        key: "business_hours",
        value: "Monday - Sunday: 8:00 AM - 11:00 PM",
        description: "Business operating hours"
      },
      {
        key: "business_hours_hindi",
        value: "सोमवार - रविवार: सुबह 8:00 - रात 11:00",
        description: "Business operating hours in Hindi"
      },
      {
        key: "site_title",
        value: "Mahech Internet Cafe",
        description: "Website title"
      },
      {
        key: "site_title_hindi",
        value: "महेच इंटरनेट कैफे",
        description: "Website title in Hindi"
      },
      {
        key: "site_description",
        value: "Complete digital solution hub for government services, banking, and more",
        description: "Website description"
      },
      {
        key: "site_description_hindi",
        value: "सरकारी सेवाओं, बैंकिंग और अधिक के लिए संपूर्ण डिजिटल समाधान केंद्र",
        description: "Website description in Hindi"
      }
    ];

    defaultSettings.forEach((setting) => {
      const id = this.currentSettingId++;
      const settingData: SiteSetting = {
        ...setting,
        id,
        updatedAt: new Date()
      };
      this.siteSettings.set(setting.key, settingData);
    });
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
    const user: User = { 
      ...insertUser, 
      id, 
      role: insertUser.role || "user",
      isActive: true,
      createdAt: new Date() 
    };
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

  async updateServiceRequestStatus(id: number, status: string): Promise<ServiceRequest | undefined> {
    const request = this.serviceRequests.get(id);
    if (request) {
      request.status = status;
      this.serviceRequests.set(id, request);
      return request;
    }
    return undefined;
  }

  // Admin functionality
  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = this.currentAnnouncementId++;
    const announcement: Announcement = {
      ...insertAnnouncement,
      id,
      titleHindi: insertAnnouncement.titleHindi || null,
      contentHindi: insertAnnouncement.contentHindi || null,
      priority: insertAnnouncement.priority || "normal",
      isActive: insertAnnouncement.isActive !== undefined ? insertAnnouncement.isActive : true,
      applyLink: insertAnnouncement.applyLink || null,
      expiryDate: insertAnnouncement.expiryDate || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.announcements.set(id, announcement);
    return announcement;
  }

  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getActiveAnnouncements(): Promise<Announcement[]> {
    const now = new Date();
    return Array.from(this.announcements.values())
      .filter(a => a.isActive && (!a.expiryDate || a.expiryDate > now))
      .sort((a, b) => {
        // Sort by priority first, then by date
        const priorityOrder = { "high": 3, "normal": 2, "low": 1 };
        const priorityDiff = priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
        if (priorityDiff !== 0) return priorityDiff;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
  }

  async updateAnnouncement(id: number, updateData: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const announcement = this.announcements.get(id);
    if (announcement) {
      const updated = { ...announcement, ...updateData, updatedAt: new Date() };
      this.announcements.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteAnnouncement(id: number): Promise<boolean> {
    return this.announcements.delete(id);
  }

  // Site settings
  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    return this.siteSettings.get(key);
  }

  async setSiteSetting(insertSetting: InsertSiteSetting): Promise<SiteSetting> {
    const existing = this.siteSettings.get(insertSetting.key);
    const setting: SiteSetting = {
      id: existing?.id || this.currentSettingId++,
      key: insertSetting.key,
      value: insertSetting.value,
      description: insertSetting.description || null,
      updatedAt: new Date(),
    };
    this.siteSettings.set(insertSetting.key, setting);
    return setting;
  }

  async getAllSiteSettings(): Promise<SiteSetting[]> {
    return Array.from(this.siteSettings.values());
  }
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize database with default data if needed
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      // Check if admin user exists
      const adminUser = await db.select().from(users).where(eq(users.username, "sumit")).limit(1);
      
      if (adminUser.length === 0) {
        // Create admin user
        await db.insert(users).values({
          username: "sumit",
          password: "1",
          role: "admin",
          isActive: true
        });

        // Create default site settings
        await this.createDefaultSettings();
        
        // Create sample announcements
        await this.createSampleAnnouncements();
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  private async createDefaultSettings() {
    const defaultSettings = [
      {
        key: "contact_phone",
        value: "+91 9306003497",
        description: "Primary contact phone number"
      },
      {
        key: "contact_phone_alt",
        value: "+91 9306003497",
        description: "Alternative contact phone number"
      },
      {
        key: "contact_whatsapp",
        value: "+91 9306003497",
        description: "WhatsApp contact number"
      },
      {
        key: "contact_email",
        value: "sumit03497@gmail.com",
        description: "Primary contact email"
      },
      {
        key: "contact_email_support",
        value: "sumit03497@gmail.com",
        description: "Support email address"
      },
      {
        key: "contact_address",
        value: "VPO DANG KALAN NEAR BAWEJA MART",
        description: "Business address"
      },
      {
        key: "contact_address_hindi",
        value: "वीपीओ डांग कलां बावेजा मार्ट के पास",
        description: "Business address in Hindi"
      },
      {
        key: "business_hours",
        value: "Monday - Sunday: 8:00 AM - 11:00 PM",
        description: "Business operating hours"
      },
      {
        key: "business_hours_hindi",
        value: "सोमवार - रविवार: सुबह 8:00 - रात 11:00",
        description: "Business operating hours in Hindi"
      },
      {
        key: "site_title",
        value: "Sumit Internet Cafe",
        description: "Website title"
      },
      {
        key: "site_title_hindi",
        value: "सुमित इंटरनेट कैफे",
        description: "Website title in Hindi"
      },
      {
        key: "site_description",
        value: "Complete digital solution hub for government services, banking, and more",
        description: "Website description"
      },
      {
        key: "site_description_hindi",
        value: "सरकारी सेवाओं, बैंकिंग और अधिक के लिए संपूर्ण डिजिटल समाधान केंद्र",
        description: "Website description in Hindi"
      }
    ];

    await db.insert(siteSettings).values(defaultSettings);
  }

  private async createSampleAnnouncements() {
    const sampleAnnouncements = [
      {
        title: "Latest Railway Job Notifications 2025",
        titleHindi: "नवीनतम रेलवे नौकरी अधिसूचनाएं 2025",
        content: "New railway job openings for various positions including ALP, Group D, Technician, and Officer posts. Apply now for government jobs with good salary packages and job security.",
        contentHindi: "ALP, ग्रुप D, तकनीशियन और अधिकारी पदों सहित विभिन्न पदों के लिए नई रेलवे नौकरी के अवसर। अच्छे वेतन पैकेज और नौकरी की सुरक्षा के साथ सरकारी नौकरी के लिए आवेदन करें।",
        category: "vacancy",
        priority: "high",
        isActive: true,
        applyLink: "https://rrc.indianrailways.gov.in/",
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        title: "SSC CGL 2025 Application Form Available",
        titleHindi: "SSC CGL 2025 आवेदन फॉर्म उपलब्ध",
        content: "SSC Combined Graduate Level (CGL) 2025 application form is now available online. Apply for various central government posts with competitive salary packages.",
        contentHindi: "SSC संयुक्त स्नातक स्तर (CGL) 2025 आवेदन फॉर्म अब ऑनलाइन उपलब्ध है। प्रतिस्पर्धी वेतन पैकेज के साथ विभिन्न केंद्रीय सरकारी पदों के लिए आवेदन करें।",
        category: "form",
        priority: "high",
        isActive: true,
        applyLink: "https://ssc.nic.in/Portal/Apply",
        expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Bank PO Recruitment 2025 - Multiple Banks",
        titleHindi: "बैंक पीओ भर्ती 2025 - कई बैंक",
        content: "Various public sector banks are recruiting for Probationary Officer (PO) positions. Great opportunity for graduates to start their banking career with excellent growth prospects.",
        contentHindi: "विभिन्न सार्वजनिक क्षेत्र के बैंक प्रोबेशनरी ऑफिसर (PO) पदों के लिए भर्ती कर रहे हैं। स्नातकों के लिए बेहतरीन विकास संभावनाओं के साथ बैंकिंग करियर शुरू करने का शानदार अवसर।",
        category: "vacancy",
        priority: "high",
        isActive: true,
        applyLink: "https://ibps.in/",
        expiryDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      },
      {
        title: "UPSC Civil Services Prelims 2025 Notification",
        titleHindi: "UPSC सिविल सेवा प्रारंभिक 2025 अधिसूचना",
        content: "UPSC has released the notification for Civil Services Preliminary Examination 2025. This is the most prestigious examination for administrative services in India.",
        contentHindi: "UPSC ने सिविल सेवा प्रारंभिक परीक्षा 2025 की अधिसूचना जारी की है। यह भारत में प्रशासनिक सेवाओं के लिए सबसे प्रतिष्ठित परीक्षा है।",
        category: "form",
        priority: "high",
        isActive: true,
        applyLink: "https://upsc.gov.in/",
        expiryDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      },
      {
        title: "State Government Teacher Recruitment 2025",
        titleHindi: "राज्य सरकार शिक्षक भर्ती 2025",
        content: "Various state governments are recruiting for teaching positions from primary to secondary level. Good opportunity for B.Ed graduates to serve in education sector.",
        contentHindi: "विभिन्न राज्य सरकारें प्राथमिक से माध्यमिक स्तर तक शिक्षक पदों के लिए भर्ती कर रही हैं। B.Ed स्नातकों के लिए शिक्षा क्षेत्र में सेवा करने का अच्छा अवसर।",
        category: "vacancy",
        priority: "normal",
        isActive: true,
        applyLink: "https://www.sarkariresult.com/",
        expiryDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Digital India Services Now Available",
        titleHindi: "डिजिटल इंडिया सेवाएं अब उपलब्ध",
        content: "We now provide comprehensive Digital India services including e-governance applications, digital certificates, and online government form submissions with expert assistance.",
        contentHindi: "हम अब व्यापक डिजिटल इंडिया सेवाएं प्रदान करते हैं जिसमें ई-गवर्नेंस एप्लिकेशन, डिजिटल प्रमाणपत्र और विशेषज्ञ सहायता के साथ ऑनलाइन सरकारी फॉर्म सबमिशन शामिल है।",
        category: "update",
        priority: "normal",
        isActive: true,
        expiryDate: null,
      }
    ];

    await db.insert(announcements).values(sampleAnnouncements);
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }

  async createServiceRequest(insertRequest: InsertServiceRequest): Promise<ServiceRequest> {
    const [request] = await db
      .insert(serviceRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getServiceRequests(): Promise<ServiceRequest[]> {
    return await db
      .select()
      .from(serviceRequests)
      .orderBy(desc(serviceRequests.createdAt));
  }

  async updateServiceRequestStatus(id: number, status: string): Promise<ServiceRequest | undefined> {
    const [request] = await db
      .update(serviceRequests)
      .set({ status })
      .where(eq(serviceRequests.id, id))
      .returning();
    return request || undefined;
  }

  // Admin functionality
  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const [announcement] = await db
      .insert(announcements)
      .values(insertAnnouncement)
      .returning();
    return announcement;
  }

  async getAnnouncements(): Promise<Announcement[]> {
    return await db
      .select()
      .from(announcements)
      .orderBy(desc(announcements.createdAt));
  }

  async getActiveAnnouncements(): Promise<Announcement[]> {
    const now = new Date();
    return await db
      .select()
      .from(announcements)
      .where(
        and(
          eq(announcements.isActive, true),
          // Either no expiry date or expiry date is in the future
          // Note: We need to handle null expiry dates properly
        )
      )
      .orderBy(desc(announcements.createdAt));
  }

  async updateAnnouncement(id: number, updateData: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const [announcement] = await db
      .update(announcements)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(announcements.id, id))
      .returning();
    return announcement || undefined;
  }

  async deleteAnnouncement(id: number): Promise<boolean> {
    const result = await db
      .delete(announcements)
      .where(eq(announcements.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Site settings
  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const [setting] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, key));
    return setting || undefined;
  }

  async setSiteSetting(insertSetting: InsertSiteSetting): Promise<SiteSetting> {
    const [setting] = await db
      .insert(siteSettings)
      .values(insertSetting)
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: {
          value: insertSetting.value,
          description: insertSetting.description,
          updatedAt: new Date()
        }
      })
      .returning();
    return setting;
  }

  async getAllSiteSettings(): Promise<SiteSetting[]> {
    return await db.select().from(siteSettings);
  }
}

export const storage = new DatabaseStorage();
