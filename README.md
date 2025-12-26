# NotesPlus - A Simple Note Taking Application with Version Control

A modern, full-stack note-taking application that empowers users to create, manage, and maintain version history of their notes with built-in access control and collaboration features.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## 🎯 Overview

NotesPlus is a full-stack web application that simplifies note management with powerful version control capabilities. Users can create notes, track changes across versions, manage drafts, and collaborate with others through permission-based sharing.

Whether you're jotting down quick ideas or managing complex documents, NotesPlus provides an intuitive interface backed by a robust backend architecture.

## ✨ Features

### Current Features
- **User Authentication & Authorization**: Secure signup and login with JWT-based authentication
- **Note Creation & Management**: Create, edit, and delete notes with ease
- **Version Control**: Automatically track all changes to your notes with full version history
- **Draft Support**: Save work-in-progress notes as drafts before finalizing
- **User Sessions**: Persistent session management for seamless user experience
- **Audit Logging**: Track all user actions for accountability and security
- **Media Support**: Attach images and media files to your notes
- **Basic Role System**: Foundation for role-based access control

### Planned Features
- **Tagging System**: Organize and categorize notes with custom tags
- **Advanced Permissions**: Fine-grained access control (view, edit, share)
- **Note Sharing**: Collaborate with other users on shared notes
- **Enhanced User Roles**: Admin, editor, viewer roles with specific permissions
- **Search & Filtering**: Full-text search and advanced filtering capabilities
- **Collaboration Features**: Real-time collaboration on shared notes

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js (^20.19.0 || >=22.12.0)
- **Framework**: Express.js 5.x
- **ORM**: Sequelize 6.x
- **Database**: MySQL 2.x
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **API Documentation**: Swagger/OpenAPI with swagger-jsdoc and swagger-ui-express
- **Language**: TypeScript
- **Development**: Nodemon, TypeScript compiler

### Frontend
- **Framework**: Vue.js 3.5.x
- **Build Tool**: Vite
- **Routing**: Vue Router 4.x
- **State Management**: Pinia
- **HTTP Client**: Axios
- **UI Framework**: Radix Vue with Tailwind CSS
- **CSS Utility**: Tailwind CSS 3.x
- **Icons**: Lucide Vue Next

### DevOps
- **Containerization**: Docker & Docker Compose
- **Language**: TypeScript (Backend & Frontend)

## 📁 Project Structure

```
noteTaking/
├── api/                          # Backend Express.js application
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   │   ├── config.json      # Database configuration
│   │   │   ├── database.ts      # Sequelize instance
│   │   │   └── environment.ts   # Environment variables
│   │   ├── constants/           # Application constants
│   │   ├── controllers/         # Route handlers
│   │   │   ├── auth/           # Authentication logic
│   │   │   ├── Notes/          # Note CRUD operations
│   │   │   └── Users/          # User management
│   │   ├── middlewares/         # Express middlewares
│   │   │   ├── auth.ts         # JWT authentication
│   │   │   ├── errorHandler.ts # Global error handling
│   │   │   └── noteOwnership.ts # Note access validation
│   │   ├── migrations/          # Database migrations
│   │   ├── models/              # Sequelize models
│   │   ├── repositories/        # Data access layer
│   │   ├── routes/              # API route definitions
│   │   ├── services/            # Business logic
│   │   │   ├── Auth/
│   │   │   ├── Notes/
│   │   │   └── Users/
│   │   ├── utils/               # Utility functions
│   │   ├── index.ts             # Application entry point
│   │   └── swagger.ts           # Swagger configuration
│   ├── DockerFile
│   ├── docker-compose.yml
│   ├── package.json
│   └── tsconfig.json
│
└── web/                         # Frontend Vue.js application
    ├── src/
    │   ├── components/          # Reusable Vue components
    │   │   ├── ui/             # UI component library
    │   │   └── icons/          # Icon components
    │   ├── views/              # Page components
    │   │   ├── HomeView.vue
    │   │   ├── LoginView.vue
    │   │   ├── SignupView.vue
    │   │   ├── NoteView.vue
    │   │   ├── ProfileView.vue
    │   │   └── AboutView.vue
    │   ├── router/             # Vue Router configuration
    │   ├── services/           # API client services
    │   │   ├── api.ts
    │   │   ├── auth.service.ts
    │   │   ├── note.service.ts
    │   │   └── user.service.ts
    │   ├── stores/             # Pinia state management
    │   ├── lib/                # Utility library
    │   ├── assets/             # CSS and static assets
    │   ├── App.vue
    │   └── main.ts
    ├── public/
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json
```

## 📊 Database Schema

### Core Entities

#### Users
Stores user account information with authentication and status tracking.
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `status_id` - Foreign key to Status (active/inactive)
- `role_id` - Foreign key to Role (admin/user/viewer)
- `created_at`, `updated_at` - Timestamps

#### Notes
Main note entity with metadata and version tracking.
- `id` - Primary key
- `title` - Note title
- `current_version_id` - Foreign key to NoteVersion (latest version)
- `status_id` - Foreign key to Status
- `author_id` - Foreign key to User (creator)
- `created_at`, `updated_at` - Timestamps

#### NoteVersions
Immutable version history for each note.
- `id` - Primary key
- `note_id` - Foreign key to Note
- `user_id` - Foreign key to User (who made the change)
- `title` - Version title
- `description` - Version content
- `created_at` - Creation timestamp (no update timestamp)

#### NoteDrafts
Work-in-progress notes that haven't been finalized.
- `id` - Primary key
- `note_id` - Foreign key to Note (nullable for new drafts)
- `user_id` - Foreign key to User
- `desc` - Draft content
- `created_at`, `updated_at` - Timestamps

#### Supporting Entities
- **Roles**: User role definitions (admin, user, viewer)
- **Statuses**: Note and user status (active, archived, deleted)
- **Tags**: Note categories/tags for organization
- **Sessions**: User session tracking
- **Media**: File/image attachments
- **NoteMedia**: Association between notes and media
- **UserNote**: User-note relationships
- **NotePermission**: Access control for note sharing
- **Audits**: Action logging for compliance and debugging

## 🚀 Getting Started

### Prerequisites
- Node.js (^20.19.0 || >=22.12.0)
- MySQL 8.0+
- Docker & Docker Compose (optional)

### ⚡ Quick Start (Backend)

```bash
# 1. Navigate to the API directory
cd api

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env file with your database credentials
# (See Backend Setup section below for details)

# 4. Run database migrations
npx sequelize-cli db:migrate --config src/config/config.json

# 5. Start the server
npm start    # or npm run dev for development with auto-reload
```

The API will be available at `http://localhost:3000`

### Backend Setup (Detailed)

1. **Navigate to the API directory**
   ```bash
   cd api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the `api` directory with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=notes_db
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. **Run database migrations**
   ```bash
   npx sequelize-cli db:migrate --config src/config/config.json
   ```

5. **Start the server**
   
   **For development** (with auto-reload):
   ```bash
   npm run dev
   ```

   **For production**:
   ```bash
   npm run build
   npm start
   ```

   The API will be available at `http://localhost:3000`
   
   Swagger documentation: `http://localhost:3000/api-docs`

### Frontend Setup

1. **Navigate to the web directory**
   ```bash
   cd web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` (Vite default)

### Using Docker Compose

1. **From the root directory**
   ```bash
   docker-compose -f api/docker-compose.yml up
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Notes
- `GET /api/notes` - Get all notes (paginated)
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get note details
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `GET /api/notes/author/:authorId` - Get notes by author
- `GET /api/notes/:id/versions` - Get note version history
- `POST /api/notes/:id/versions` - Create new version

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete account

### Drafts
- `GET /api/drafts` - Get user's drafts
- `POST /api/drafts` - Create a draft
- `PUT /api/drafts/:id` - Update draft

For complete API documentation, visit `/api-docs` after starting the backend server.

## 🔮 Future Enhancements

### Phase 2: Tagging & Organization
- Implement a full tagging system for note categorization
- Add tag-based filtering and search
- Support multiple tags per note

### Phase 3: Advanced Permissions
- Fine-grained permission model (view, edit, comment, delete)
- Role-based access control (RBAC) implementation
- Admin dashboard for user management

### Phase 4: Collaboration
- Note sharing with specific users
- Permission assignment interface
- Shared notes dashboard
- Activity feed for shared notes

### Phase 5: Advanced Features
- Real-time collaborative editing
- Comments and annotations
- Note templates
- Bulk operations
- Advanced search with filters

## 📝 Development Guidelines

### Code Organization
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and validation
- **Repositories**: Abstract database access
- **Models**: Define data structures and relationships
- **Middlewares**: Cross-cutting concerns (auth, validation, error handling)

### Database Migrations
All schema changes must go through migrations:
```bash
npx sequelize-cli migration:generate --name <migration-name>
```

### TypeScript
Both frontend and backend use TypeScript. Ensure type safety:
- Define interfaces for API responses
- Use strict null checks
- Avoid using `any` type

## 📄 License

ISC License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Last Updated**: December 26, 2025
