# Mahech Internet Cafe Website

## Overview

This is a modern, full-stack web application for Mahech Internet Cafe, built as a business landing page with contact form functionality. The application showcases the cafe's services, pricing, and facility information while providing a way for customers to contact the business.

## User Preferences

Preferred communication style: Simple, everyday language.

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
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod validation

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
The application uses two main tables:
- **users**: Basic user authentication (id, username, password)
- **contact_messages**: Customer contact form submissions (id, name, email, phone, message, created_at)

## Data Flow

1. **Contact Form Submission**: 
   - User fills out contact form on frontend
   - Form data validated using Zod schemas
   - POST request sent to `/api/contact` endpoint
   - Backend validates and stores message in database
   - Success/error response sent back to frontend

2. **Contact Messages Retrieval**:
   - Admin can fetch all contact messages via `/api/contact-messages`
   - Backend queries database and returns JSON array

3. **Static Content**:
   - All business information (services, pricing, gallery) is statically defined in React components
   - No database queries needed for main content

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

The architecture prioritizes developer experience, type safety, and maintainability while keeping the complexity appropriate for a business landing page with contact functionality.