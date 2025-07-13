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
import { eq, desc, and, or, gt, isNull } from "drizzle-orm";

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
    // Calculate dates for realistic sample data
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 15);
    const twoMonthsLater = new Date(today.getFullYear(), today.getMonth() + 2, 10);
    const threeMonthsLater = new Date(today.getFullYear(), today.getMonth() + 3, 5);

    const sampleAnnouncements = [
      {
        title: "Latest Railway Job Notifications 2025",
        titleHindi: "नवीनतम रेलवे नौकरी अधिसूचनाएं 2025",
        content: "New railway job openings for various positions including ALP, Group D, Technician, and Officer posts. Apply now for government jobs with good salary packages and job security.",
        contentHindi: "ALP, ग्रुप D, तकनीशियन और अधिकारी पदों सहित विभिन्न पदों के लिए नई रेलवे नौकरी के अवसर। अच्छे वेतन पैकेज और नौकरी की सुरक्षा के साथ सरकारी नौकरी के लिए आवेदन करें।",
        category: "vacancy",
        priority: "high",
        isActive: true,
        applyLink: "https://rrc.indianrailways.gov.in",
        expiryDate: nextMonth
      },
      {
        title: "SSC CGL 2025 Application Form Available",
        titleHindi: "SSC CGL 2025 आवेदन फॉर्म उपलब्ध",
        content: "Staff Selection Commission Combined Graduate Level Examination 2025 application form is now available. Apply online for various Group B and Group C posts in government departments.",
        contentHindi: "कर्मचारी चयन आयोग संयुक्त स्नातक स्तर परीक्षा 2025 का आवेदन फॉर्म अब उपलब्ध है। सरकारी विभागों में विभिन्न ग्रुप B और ग्रुप C पदों के लिए ऑनलाइन आवेदन करें।",
        category: "form",
        priority: "high",
        isActive: true,
        applyLink: "https://ssc.nic.in",
        expiryDate: nextMonth
      },
      {
        title: "Banking Recruitment 2025 - Multiple Banks",
        titleHindi: "बैंकिंग भर्ती 2025 - अनेक बैंक",
        content: "Various public sector banks have announced recruitment for Probationary Officer, Clerk, and Specialist Officer positions. Check eligibility and apply online.",
        contentHindi: "विभिन्न सार्वजनिक क्षेत्र के बैंकों ने प्रोबेशनरी ऑफिसर, क्लर्क और स्पेशलिस्ट ऑफिसर पदों के लिए भर्ती की घोषणा की है। पात्रता जांचें और ऑनलाइन आवेदन करें।",
        category: "vacancy",
        priority: "normal",
        isActive: true,
        applyLink: "https://ibps.in",
        expiryDate: twoMonthsLater
      },
      {
        title: "UPSC Civil Services Preliminary Exam 2025",
        titleHindi: "UPSC सिविल सेवा प्रारंभिक परीक्षा 2025",
        content: "Union Public Service Commission has announced Civil Services Examination 2025. Registration for IAS, IPS, IFS and other allied services is now open.",
        contentHindi: "संघ लोक सेवा आयोग ने सिविल सेवा परीक्षा 2025 की घोषणा की है। IAS, IPS, IFS और अन्य संबद्ध सेवाओं के लिए पंजीकरण अब खुला है।",
        category: "form",
        priority: "high",
        isActive: true,
        applyLink: "https://upsc.gov.in",
        expiryDate: threeMonthsLater
      },
      {
        title: "State Government Teacher Recruitment 2025",
        titleHindi: "राज्य सरकार शिक्षक भर्ती 2025",
        content: "Various state governments have announced teacher recruitment for primary, secondary and higher secondary schools. Apply for teaching positions with attractive salary packages.",
        contentHindi: "विभिन्न राज्य सरकारों ने प्राथमिक, माध्यमिक और उच्च माध्यमिक स्कूलों के लिए शिक्षक भर्ती की घोषणा की है। आकर्षक वेतन पैकेज के साथ शिक्षण पदों के लिए आवेदन करें।",
        category: "vacancy",
        priority: "normal",
        isActive: true,
        applyLink: "https://education.gov.in",
        expiryDate: twoMonthsLater
      },
      {
        title: "Important Notice: Document Verification Updates",
        titleHindi: "महत्वपूर्ण सूचना: दस्तावेज सत्यापन अपडेट",
        content: "New guidelines for document verification process have been issued. All candidates must follow the updated procedure for government job applications.",
        contentHindi: "दस्तावेज सत्यापन प्रक्रिया के लिए नई गाइडलाइन जारी की गई हैं। सभी उम्मीदवारों को सरकारी नौकरी के आवेदन के लिए अपडेटेड प्रक्रिया का पालन करना होगा।",
        category: "notice",
        priority: "normal",
        isActive: true,
        expiryDate: null // No expiry for notices
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
      isActive: insertAnnouncement.isActive !== undefined ? announcement.isActive : true,
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
    // Calculate dates for realistic sample data
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 15);
    const twoMonthsLater = new Date(today.getFullYear(), today.getMonth() + 2, 10);
    const threeMonthsLater = new Date(today.getFullYear(), today.getMonth() + 3, 5);

    const sampleAnnouncements = [
      {
        title: "Latest Railway Job Notifications 2025",
        titleHindi: "नवीनतम रेलवे नौकरी अधिसूचनाएं 2025",
        content: "New railway job openings for various positions including ALP, Group D, Technician, and Officer posts. Apply now for government jobs with good salary packages and job security.",
        contentHindi: "ALP, ग्रुप D, तकनीशियन और अधिकारी पदों सहित विभिन्न पदों के लिए नई रेलवे नौकरी के अवसर। अच्छे वेतन पैकेज और नौकरी की सुरक्षा के साथ सरकारी नौकरी के लिए आवेदन करें।",
        category: "vacancy",
        priority: "high",
        isActive: true,
        applyLink: "https://rrc.indianrailways.gov.in",
        expiryDate: nextMonth
      },
      {
        title: "SSC CGL 2025 Application Form Available",
        titleHindi: "SSC CGL 2025 आवेदन फॉर्म उपलब्ध",
        content: "Staff Selection Commission Combined Graduate Level Examination 2025 application form is now available. Apply online for various Group B and Group C posts in government departments.",
        contentHindi: "कर्मचारी चयन आयोग संयुक्त स्नातक स्तर परीक्षा 2025 का आवेदन फॉर्म अब उपलब्ध है। सरकारी विभागों में विभिन्न ग्रुप B और ग्रुप C पदों के लिए ऑनलाइन आवेदन करें।",
        category: "form",
        priority: "high",
        isActive: true,
        applyLink: "https://ssc.nic.in",
        expiryDate: nextMonth
      },
      {
        title: "Banking Recruitment 2025 - Multiple Banks",
        titleHindi: "बैंकिंग भर्ती 2025 - अनेक बैंक",
        content: "Various public sector banks have announced recruitment for Probationary Officer, Clerk, and Specialist Officer positions. Check eligibility and apply online.",
        contentHindi: "विभिन्न सार्वजनिक क्षेत्र के बैंकों ने प्रोबेशनरी ऑफिसर, क्लर्क और स्पेशलिस्ट ऑफिसर पदों के लिए भर्ती की घोषणा की है। पात्रता जांचें और ऑनलाइन आवेदन करें।",
        category: "vacancy",
        priority: "normal",
        isActive: true,
        applyLink: "https://ibps.in",
        expiryDate: twoMonthsLater
      },
      {
        title: "UPSC Civil Services Preliminary Exam 2025",
        titleHindi: "UPSC सिविल सेवा प्रारंभिक परीक्षा 2025",
        content: "Union Public Service Commission has announced Civil Services Examination 2025. Registration for IAS, IPS, IFS and other allied services is now open.",
        contentHindi: "संघ लोक सेवा आयोग ने सिविल सेवा प्रारंभिक परीक्षा 2025 की घोषणा की है। IAS, IPS, IFS और अन्य संबद्ध सेवाओं के लिए पंजीकरण अब खुला है।",
        category: "form",
        priority: "high",
        isActive: true,
        applyLink: "https://upsc.gov.in",
        expiryDate: threeMonthsLater
      },
      {
        title: "State Government Teacher Recruitment 2025",
        titleHindi: "राज्य सरकार शिक्षक भर्ती 2025",
        content: "Various state governments have announced teacher recruitment for primary, secondary and higher secondary schools. Apply for teaching positions with attractive salary packages.",
        contentHindi: "विभिन्न राज्य सरकारों ने प्राथमिक, माध्यमिक और उच्च माध्यमिक स्कूलों के लिए शिक्षक भर्ती की घोषणा की है। आकर्षक वेतन पैकेज के साथ शिक्षण पदों के लिए आवेदन करें।",
        category: "vacancy",
        priority: "normal",
        isActive: true,
        applyLink: "https://education.gov.in",
        expiryDate: twoMonthsLater
      },
      {
        title: "Important Notice: Document Verification Updates",
        titleHindi: "महत्वपूर्ण सूचना: दस्तावेज सत्यापन अपडेट",
        content: "New guidelines for document verification process have been issued. All candidates must follow the updated procedure for government job applications.",
        contentHindi: "दस्तावेज सत्यापन प्रक्रिया के लिए नई गाइडलाइन जारी की गई हैं। सभी उम्मीदवारों को सरकारी नौकरी के आवेदन के लिए अपडेटेड प्रक्रिया का पालन करना होगा।",
        category: "notice",
        priority: "normal",
        isActive: true,
        expiryDate: null // No expiry for notices
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
          or(
            isNull(announcements.expiryDate),
            gt(announcements.expiryDate, now)
          )
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