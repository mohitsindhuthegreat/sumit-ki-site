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
import { eq, desc, and, or, gt, isNull, isNotNull, lt, sql } from "drizzle-orm";

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

  // Auto-update system
  autoUpdateExpiredAnnouncements(): Promise<void>;
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

  // Auto-update system for MemStorage
  async autoUpdateExpiredAnnouncements(): Promise<void> {
    const today = new Date();
    
    // Mark expired announcements as inactive
    for (const [id, announcement] of this.announcements.entries()) {
      if (announcement.expiryDate && announcement.expiryDate < today && announcement.isActive) {
        this.announcements.set(id, { ...announcement, isActive: false });
      }
    }

    // Check if we need fresh announcements
    const activeCount = Array.from(this.announcements.values()).filter(a => a.isActive).length;
    
    if (activeCount < 4) {
      this.addFreshAnnouncementsToMemory();
    }
  }

  private addFreshAnnouncementsToMemory(): void {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    const freshAnnouncements = [
      {
        title: "Fresh Government Job Alert - Auto Updated",
        titleHindi: "ताजा सरकारी नौकरी अलर्ट - स्वतः अपडेट",
        content: "New government job opportunities have been automatically updated based on latest notifications.",
        contentHindi: "नवीनतम अधिसूचनाओं के आधार पर नए सरकारी नौकरी के अवसर स्वचालित रूप से अपडेट किए गए हैं।",
        category: "vacancy",
        priority: "high",
        isActive: true,
        applyLink: "https://example.com",
        expiryDate: nextWeek
      }
    ];

    freshAnnouncements.forEach(ann => {
      const id = this.currentAnnouncementId++;
      const announcement: Announcement = {
        ...ann,
        id,
        titleHindi: ann.titleHindi || null,
        contentHindi: ann.contentHindi || null,
        priority: ann.priority || "normal",
        applyLink: ann.applyLink || null,
        expiryDate: ann.expiryDate || null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.announcements.set(id, announcement);
    });
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
    
    // Upcoming dates - for active forms/vacancies
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(today.getDate() + 14);
    
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);
    
    const twoMonthsLater = new Date();
    twoMonthsLater.setDate(today.getDate() + 60);
    
    // Past dates - for expired forms (these should not show up as active)
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);
    
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);

    // Auto-updating announcements with realistic dates
    const sampleAnnouncements = [
      {
        title: "Railway RRB NTPC 2025 - New Recruitment Notification",
        titleHindi: "रेलवे RRB NTPC 2025 - नई भर्ती अधिसूचना",
        content: "Railway Recruitment Board has announced NTPC 2025 recruitment for 10,000+ posts including Station Master, Commercial Clerk, Traffic Assistant, and Goods Guard positions. Online application starts soon.",
        contentHindi: "रेलवे भर्ती बोर्ड ने स्टेशन मास्टर, कमर्शियल क्लर्क, ट्रैफिक असिस्टेंट और गुड्स गार्ड पदों सहित 10,000+ पदों के लिए NTPC 2025 भर्ती की घोषणा की है। ऑनलाइन आवेदन जल्द शुरू होगा।",
        category: "vacancy",
        priority: "high",
        isActive: true,
        applyLink: "https://rrc.indianrailways.gov.in",
        expiryDate: twoMonthsLater
      },
      {
        title: "SSC CHSL 2025 Application Form - Last 5 Days",
        titleHindi: "SSC CHSL 2025 आवेदन फॉर्म - अंतिम 5 दिन",
        content: "Staff Selection Commission CHSL 2025 application deadline approaching fast. Only 5 days left to apply for Lower Division Clerk, Data Entry Operator, and Postal Assistant posts.",
        contentHindi: "कर्मचारी चयन आयोग CHSL 2025 आवेदन की अंतिम तारीख तेजी से आ रही है। लोअर डिवीजन क्लर्क, डेटा एंट्री ऑपरेटर और पोस्टल असिस्टेंट पदों के लिए आवेदन करने के लिए केवल 5 दिन बचे हैं।",
        category: "form",
        priority: "high",
        isActive: true,
        applyLink: "https://ssc.nic.in",
        expiryDate: nextWeek
      },
      {
        title: "IBPS Clerk 2025 Recruitment - 5000 Vacancies",
        titleHindi: "IBPS क्लर्क 2025 भर्ती - 5000 रिक्तियां",
        content: "Institute of Banking Personnel Selection has announced Clerk recruitment 2025 for various public sector banks. 5000+ vacancies available across India with good salary package.",
        contentHindi: "बैंकिंग कार्मिक चयन संस्थान ने विभिन्न सार्वजनिक क्षेत्र के बैंकों के लिए क्लर्क भर्ती 2025 की घोषणा की है। अच्छे वेतन पैकेज के साथ पूरे भारत में 5000+ रिक्तियां उपलब्ध हैं।",
        category: "vacancy",
        priority: "normal",
        isActive: true,
        applyLink: "https://ibps.in",
        expiryDate: twoWeeksLater
      },
      {
        title: "UPSC CSE 2025 Prelims Application Open",
        titleHindi: "UPSC CSE 2025 प्रीलिम्स आवेदन खुला",
        content: "Union Public Service Commission Civil Services Examination 2025 application is now open. Apply for IAS, IPS, IFS and 22 other central services. Last date to apply approaching.",
        contentHindi: "संघ लोक सेवा आयोग सिविल सेवा परीक्षा 2025 का आवेदन अब खुला है। IAS, IPS, IFS और 22 अन्य केंद्रीय सेवाओं के लिए आवेदन करें। आवेदन की अंतिम तारीख नजदीक आ रही है।",
        category: "form",
        priority: "high",
        isActive: true,
        applyLink: "https://upsc.gov.in",
        expiryDate: nextMonth
      },
      {
        title: "Delhi Police Constable 2025 - 25000 Posts",
        titleHindi: "दिल्ली पुलिस कांस्टेबल 2025 - 25000 पद",
        content: "Delhi Police has announced massive recruitment for 25,000 Constable posts. Physical fitness test, written exam, and medical examination to be conducted. Applications open now.",
        contentHindi: "दिल्ली पुलिस ने 25,000 कांस्टेबल पदों के लिए बड़े पैमाने पर भर्ती की घोषणा की है। शारीरिक फिटनेस टेस्ट, लिखित परीक्षा और मेडिकल परीक्षा आयोजित की जाएगी। आवेदन अब खुले हैं।",
        category: "vacancy",
        priority: "high",
        isActive: true,
        applyLink: "https://delhipolice.nic.in",
        expiryDate: twoWeeksLater
      },
      {
        title: "Teaching Jobs Alert - Various States TET 2025",
        titleHindi: "शिक्षक नौकरी अलर्ट - विभिन्न राज्य TET 2025",
        content: "Multiple state governments have announced Teacher Eligibility Test 2025. Apply for primary and upper primary teacher positions with attractive salary and job security.",
        contentHindi: "कई राज्य सरकारों ने शिक्षक पात्रता परीक्षा 2025 की घोषणा की है। आकर्षक वेतन और नौकरी की सुरक्षा के साथ प्राथमिक और उच्च प्राथमिक शिक्षक पदों के लिए आवेदन करें।",
        category: "form",
        priority: "normal",
        isActive: true,
        applyLink: "https://education.gov.in",
        expiryDate: nextMonth
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

  // Auto-update system for announcements
  async autoUpdateExpiredAnnouncements(): Promise<void> {
    const today = new Date();
    
    // Get all expired announcements
    const expiredAnnouncements = await db
      .select()
      .from(announcements)
      .where(
        and(
          isNotNull(announcements.expiryDate),
          lt(announcements.expiryDate, today)
        )
      );

    // Mark expired announcements as inactive
    if (expiredAnnouncements.length > 0) {
      await db
        .update(announcements)
        .set({ isActive: false })
        .where(
          and(
            isNotNull(announcements.expiryDate),
            lt(announcements.expiryDate, today)
          )
        );
    }

    // Check if we need to add fresh announcements
    const activeCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(announcements)
      .where(eq(announcements.isActive, true));

    // If we have less than 4 active announcements, add fresh ones
    if (activeCount[0].count < 4) {
      await this.addFreshAnnouncements();
    }
  }

  private async addFreshAnnouncements(): Promise<void> {
    try {
      // Try to fetch AI-generated content first
      const aiJobs = await this.getAIGeneratedJobs();
      
      if (aiJobs.length > 0) {
        // Add AI-generated fresh announcements
        const jobsToAdd = aiJobs.slice(0, 3); // Add up to 3 fresh announcements
        await db.insert(announcements).values(jobsToAdd);
        console.log(`Added ${jobsToAdd.length} AI-generated job announcements`);
      } else {
        // Fallback to static content if AI fails
        await this.addStaticFreshAnnouncements();
      }
    } catch (error) {
      console.error('Error adding AI-generated jobs, using fallback:', error);
      await this.addStaticFreshAnnouncements();
    }
  }

  private async getAIGeneratedJobs(): Promise<any[]> {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY || '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'}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            {
              role: 'system',
              content: `You are an expert government job research assistant for Indian government notifications. Generate realistic and current Indian government job notifications and form deadlines for ${currentDate}. 

IMPORTANT: Return ONLY a valid JSON array of 3 objects, no other text or formatting. Each object must have this exact structure:
[
  {
    "title": "Job/Form Title in English",
    "titleHindi": "Job/Form Title in Hindi",
    "content": "Detailed description in English (50-100 words)",
    "contentHindi": "Detailed description in Hindi (50-100 words)",
    "category": "vacancy",
    "priority": "high",
    "applyLink": "https://official-website.com",
    "daysToExpiry": 15
  }
]

Focus on: SSC, Railway, Banking, UPSC, State Government, Teaching, Police, and other popular Indian government opportunities. Make content realistic and current with proper official websites.`
            },
            {
              role: 'user',
              content: `Generate 3 fresh government job/form notifications for today ${currentDate}. Include mix of:
- 1 urgent form (7-15 days remaining)
- 1 job vacancy (15-30 days remaining) 
- 1 regular update (20-45 days remaining)

Focus on current popular categories like SSC CGL/CHSL, Railway RRB, Banking IBPS/SBI, UPSC CSE, State PSC, Teaching TET/CTET, and Police SI/Constable recruitment.`
            }
          ],
          max_tokens: 1500,
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
      
      // Clean response and parse
      const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
      const jobs = JSON.parse(cleanResponse);
      const now = new Date();
      
      return jobs.map((job: any) => {
        const expiryDate = new Date();
        expiryDate.setDate(now.getDate() + (job.daysToExpiry || 20));
        
        return {
          title: job.title,
          titleHindi: job.titleHindi,
          content: job.content,
          contentHindi: job.contentHindi,
          category: job.category || 'vacancy',
          priority: job.priority || 'normal',
          isActive: true,
          applyLink: job.applyLink,
          expiryDate: expiryDate
        };
      });
    } catch (error) {
      console.error('Error fetching AI-generated jobs:', error);
      return [];
    }
  }

  private async addStaticFreshAnnouncements(): Promise<void> {
    const today = new Date();
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(today.getDate() + 14);
    
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);

    const freshAnnouncements = [
      {
        title: "NDA & NA 2025 (I) - Applications Now Open",
        titleHindi: "NDA & NA 2025 (I) - आवेदन अब खुले",
        content: "National Defence Academy and Naval Academy examination 2025 (I) applications are now open. Apply for a prestigious career in Indian Armed Forces.",
        contentHindi: "राष्ट्रीय रक्षा अकादमी और नौसेना अकादमी परीक्षा 2025 (I) के आवेदन अब खुले हैं। भारतीय सशस्त्र बलों में प्रतिष्ठित करियर के लिए आवेदन करें।",
        category: "form",
        priority: "high",
        isActive: true,
        applyLink: "https://upsc.gov.in",
        expiryDate: nextMonth.toISOString()
      },
      {
        title: "SBI PO 2025 Recruitment Notification",
        titleHindi: "SBI PO 2025 भर्ती अधिसूचना",
        content: "State Bank of India has announced Probationary Officer recruitment 2025. Apply for management trainee positions with excellent career growth opportunities.",
        contentHindi: "भारतीय स्टेट बैंक ने प्रोबेशनरी ऑफिसर भर्ती 2025 की घोषणा की है। उत्कृष्ट करियर ग्रोथ के अवसरों के साथ मैनेजमेंट ट्रेनी पदों के लिए आवेदन करें।",
        category: "vacancy",
        priority: "high",
        isActive: true,
        applyLink: "https://sbi.co.in/careers",
        expiryDate: twoWeeksLater.toISOString()
      }
    ];

    await db.insert(announcements).values(freshAnnouncements.slice(0, 2));
    console.log('Added fallback static announcements');
  }
}

export const storage = new DatabaseStorage();