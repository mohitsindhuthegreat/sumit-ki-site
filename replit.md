# Mahech Internet Cafe Website

## Overview

This is a comprehensive, full-stack web application for Mahech Internet Cafe, built as a complete online solution hub. The application provides extensive digital services including government ID assistance, banking & bill payments, printing services, online form filling, travel booking, and more. It serves as a one-stop digital solution platform for the community.

## User Preferences

Preferred communication style: Simple, everyday language.
Bilingual support: English and Hindi throughout the interface.
Focus on comprehensive service coverage with professional presentation.

## System Architecture

The application follows a monorepo architecture with a clear separation between frontend and backend code:

- **Frontend**: React-based SPA using modern web technologies
- **Backend**: Express.js REST API server
- **Database**: PostgreSQL with Drizzle ORM
- **Build System**: Vite for frontend bundling and development
- **UI Framework**: Tailwind CSS with shadcn/ui components

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing (single-page application)
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming and dark mode support
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: Bilingual content (English/Hindi) throughout the application

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Style**: RESTful API with JSON responses
- **Database**: PostgreSQL accessed via Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Management**: Drizzle migrations with shared schema definitions

### Data Storage
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **Migration Strategy**: Drizzle Kit for schema migrations
- **Fallback Storage**: In-memory storage implementation for development

### Database Schema
The application uses three main tables:
- **users**: Basic user authentication (id, username, password)
- **contact_messages**: Customer contact form submissions (id, name, email, phone, message, service_type, created_at)
- **service_requests**: Service booking requests (id, name, phone, email, service_category, service_type, details, status, created_at)

## Data Flow

1. **Contact Form Submission**: 
   - User fills out contact form on frontend
   - Form data validated using Zod schemas
   - POST request sent to `/api/contact` endpoint
   - Backend validates and stores message in database
   - Success/error response sent back to frontend

2. **Service Request Submission**:
   - User requests specific services through service forms
   - Service request data validated and stored via `/api/service-request`
   - Includes service category, type, and customer details
   - Status tracking for service completion

3. **Admin Data Retrieval**:
   - Contact messages via `/api/contact-messages`
   - Service requests via `/api/service-requests`
   - Backend queries database and returns JSON arrays

4. **Service Content**:
   - Comprehensive service information statically defined in React components
   - Government services, banking, printing, travel, and online forms
   - Real pricing, packages, and detailed service descriptions

## External Dependencies

### Frontend Dependencies
- **UI Framework**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation
- **Form Validation**: Zod for runtime type checking
- **HTTP Client**: Built-in fetch API with custom wrapper

### Backend Dependencies
- **Database**: Neon Database (PostgreSQL-compatible)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Schema Validation**: Drizzle-zod for database schema validation

### Development Tools
- **Build Tool**: Vite with React plugin
- **TypeScript**: Full TypeScript support across the stack
- **Linting**: ESLint configuration (implied by project structure)
- **Development Experience**: Replit-specific plugins for enhanced development

## Deployment Strategy

### Development Mode
- Frontend served via Vite dev server with HMR
- Backend runs on Express with tsx for TypeScript execution
- Database operations use Drizzle with direct PostgreSQL connection

### Production Build
- Frontend built with Vite to static assets in `dist/public`
- Backend bundled with esbuild to `dist/index.js`
- Single deployment artifact with Express serving both API and static files

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Automatic fallback to in-memory storage if database unavailable
- Development/production environment detection via `NODE_ENV`

### Key Design Decisions

1. **Monorepo Structure**: Keeps related frontend/backend code together while maintaining clear separation
2. **Shared Schema**: TypeScript types shared between frontend and backend ensure type safety across the full stack
3. **shadcn/ui**: Provides high-quality, accessible components with full customization control
4. **Drizzle ORM**: Type-safe database operations with excellent TypeScript integration
5. **Vite for Frontend**: Fast development experience with excellent React integration
6. **Express for Backend**: Simple, well-established backend framework suitable for the API requirements

## Recent Changes (January 2025)

✓ Transformed from simple landing page to comprehensive online solution hub
✓ Added Government ID services section (Aadhaar, PAN, Voter ID, Ration Card, Ayushman Bharat)
✓ Implemented Banking & Bill Payment services with AEPS integration
✓ Created comprehensive Printing & Stationery services section
✓ Added Online Forms & Examination services (form filling, admit cards, results)
✓ Integrated Travel & Booking services (train, bus, flight, hotel booking)
✓ Enhanced database schema with service request tracking
✓ Added Privacy Policy and Terms & Conditions sections
✓ Implemented bilingual content (English/Hindi) throughout
✓ Created responsive design with improved navigation
✓ Added Google Maps integration for location
✓ Restructured from single-page to multi-page architecture with separate routes
✓ Fixed navigation with proper routing using Wouter for SPA functionality
✓ Created dedicated pages for each service category

### Latest Updates (January 12, 2025)

✓ **Complete Admin Panel System**
  - Secure admin login with username "sumit" and password "1" 
  - Comprehensive dashboard with statistics and management tools
  - Full CRUD operations for announcements and site content
  - Service request management with status tracking
  - Contact message management system

✓ **Advanced Database Schema**
  - Extended users table with role-based access control
  - Added announcements table with bilingual content support
  - Site settings table for dynamic configuration
  - Priority and expiry date support for announcements

✓ **Sarkari Updates Page (SarkariNetwork.com Style)**
  - Professional government job notifications display
  - Advanced filtering by category (vacancy, news, form, update, notice)
  - Real-time search functionality with Hindi support
  - Priority-based announcement sorting
  - Responsive design with modern UI elements

✓ **Admin Management Features**
  - Create/Edit/Delete announcements with bilingual content
  - Category management (Job Vacancy, News, Form Updates, etc.)
  - Priority levels (High, Normal, Low) with visual indicators
  - Expiry date management for time-sensitive announcements
  - Service request status tracking (pending, in-progress, completed)

✓ **Enhanced User Experience**
  - Latest announcements section on homepage
  - Direct admin access button in navigation
  - Mobile-responsive admin panel
  - Real-time data updates with React Query
  - Professional toast notifications for user feedback

✓ **Technical Improvements**
  - Fixed nested anchor tag warnings in React components
  - Implemented proper authentication flow
  - Added comprehensive error handling
  - Sample data initialization for demonstration
  - Optimized API endpoints for admin operations

### Admin Panel Features

**Authentication:**
- Username: sumit
- Password: 1
- Role-based access control

**Dashboard Capabilities:**
- View contact messages from customers
- Manage service requests with status updates
- Create, edit, delete announcements
- Site statistics and analytics
- Real-time data management

**Announcement Management:**
- Bilingual content support (English/Hindi)
- Category-based organization
- Priority levels for important updates
- Expiry date functionality
- Rich content editing

The architecture now provides complete administrative control over the website content, enabling dynamic updates and professional management of all customer interactions and site announcements.