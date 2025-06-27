# Overview

This is a full-stack web application built with React frontend and Express.js backend, featuring an e-commerce platform with Arabic language support. The application includes user management, product catalog, shopping cart functionality, and administrative features. It uses a modern tech stack with TypeScript, Tailwind CSS, and shadcn/ui components for the frontend, and Express with Drizzle ORM for the backend.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM for client-side navigation
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query for server state, local React state for UI
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Vite for development and production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Development Storage**: In-memory storage (MemStorage) for development
- **Session Management**: Prepared for PostgreSQL-based sessions
- **API Design**: RESTful API with /api prefix

## Development Setup
- **Environment**: Replit with Node.js 20
- **Development Server**: Vite dev server with HMR
- **Database**: PostgreSQL 16 (configured but not yet fully implemented)
- **Build Process**: Vite for frontend, esbuild for backend

# Key Components

## Frontend Components
- **Product Management**: ProductCard component for displaying products
- **Shopping Cart**: Cart component with quantity management
- **User Authentication**: Header component with login/register functionality
- **Admin Panel**: AdminPanel component for product and category management
- **Search & Navigation**: SearchBar and Navigation components
- **Order Processing**: OrderForm component for checkout
- **Reviews System**: Reviews component for customer feedback

## Backend Components
- **Storage Interface**: IStorage interface with MemStorage implementation
- **User Management**: User schema and CRUD operations
- **Route Registration**: Modular route registration system
- **Development Server**: Vite integration for development mode

## Database Schema
- **Users Table**: Contains user authentication and profile data
  - id (serial primary key)
  - username (unique text)
  - password (text)

# Data Flow

## Frontend to Backend
1. React components make API calls using fetch/React Query
2. API routes prefixed with /api handle requests
3. Storage layer manages data persistence
4. Responses sent back as JSON

## State Management
1. Local storage used for persistence in development
2. React state manages UI interactions
3. React Query handles server state caching and synchronization
4. Form state managed with React Hook Form

## Authentication Flow
1. User submits login/register form
2. Frontend validates and stores user data locally (development)
3. User state managed in React context
4. Admin privileges determined by user.isAdmin flag

# External Dependencies

## Frontend Dependencies
- **UI Framework**: React, React DOM, React Router
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **State Management**: @tanstack/react-query, react-hook-form
- **Utilities**: date-fns, lucide-react icons

## Backend Dependencies
- **Server**: Express.js, TypeScript runtime (tsx)
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Validation**: Zod, drizzle-zod
- **Development**: Vite for dev server integration

## Development Tools
- **Build**: Vite, esbuild, TypeScript compiler
- **Database**: Drizzle Kit for migrations and schema management
- **Replit Integration**: Cartographer plugin, runtime error overlay

# Deployment Strategy

## Production Build
1. Frontend built with Vite to `dist/public`
2. Backend bundled with esbuild to `dist/index.js`
3. Static files served from build output
4. Environment variables for database connection

## Development Workflow
1. `npm run dev` starts development server
2. Vite handles frontend HMR and development serving
3. Express server runs on port 5000
4. Database migrations with `npm run db:push`

## Environment Configuration
- **Development**: Uses Vite dev server with middleware mode
- **Production**: Serves static files from dist directory
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Replit**: Configured for autoscale deployment

# Changelog

- June 27, 2025: Complete migration from Lovable to Replit
  - Migrated from React Router to wouter routing system
  - Created full-stack architecture with Express.js backend
  - Implemented PostgreSQL schema with Drizzle ORM
  - Added in-memory storage for development
  - Created comprehensive API endpoints for all data operations
  - Updated all components to use type-safe frontend adapters
  - Added easy admin access button for user convenience
  - Established proper client/server separation following security best practices
  - Added category deletion functionality for admin users with confirmation dialog
  - Enhanced navigation with separator line between categories and reviews
  - Fixed dropdown arrow direction to point downward
  - Removed admin button from public interface for security
  - Redesigned login/registration system with triple name validation and phone number
  - Applied purple gradient theme to reviews interface matching user design specifications
  - Changed store name to "مارك ستور" (Mark Store) and removed tagline
  - Enhanced login/registration UI with dark theme, blur effects, and +964 country code prefix
  - Darkened purple colors throughout application for better visual appeal
  - Combined login/registration forms into single dialog with improved UX
  - Replaced secret code system with password-based admin access: "574667%&%^*^56984809548678%*%^8"
  - Removed default categories (electronics, clothing, home & garden) for clean start
  - Applied custom background color #1a012a throughout the application
  - Simplified admin authentication to use special password during registration
  - Applied purple background color #1a012a to all dialog windows (login, cart, admin panel, order form, reviews)
  - Made bottom navigation bar more rounded with rounded-t-3xl for smoother appearance
  - Enhanced all dialog forms with consistent purple theme and rounded corners
  - Fixed login/registration form validation by separating login and register modes with toggle buttons
  - Applied purple background #1a012a to product cards for consistent theme
  - Removed order confirmation requirement for logged-in users - anyone can place orders
  - Enhanced form validation with diagnostic logging for troubleshooting
  - Changed site title to "مارك ستور" (Mark Store) with Arabic branding
  - Added store description: "متجر الكتروني لبيع الاكسسوارات الكيمنك"
  - Added delivery information: "توصيل جميع محافظات العراق 5 الف"
  - Updated product display: removed description from product cards
  - Added product detail modal that opens when clicking on products
  - Added "اضغط لمعرفة تفاصيل المنتج" text under product names
  - Set HTML lang to "ar" and dir to "rtl" for proper Arabic support
  - Swapped positions of "الرئيسية" and "التصنيفات" in bottom navigation
  - Moved cart to right side of header, login/register buttons to left side
  - Removed italic styling from product detail instruction text
  - Updated page title to show only "مارك ستور" in browser tab
  - Replaced user info display with dropdown profile icon showing name, admin status, phone, and logout button

# User Preferences

Preferred communication style: Simple, everyday language.