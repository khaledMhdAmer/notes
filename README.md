# NotesPlus

A modern, full-stack note-taking application with version control, built with Express.js and Vue.js.

## 📋 Project Summary

NotesPlus is a web application that allows users to create, manage, and maintain version history of their notes. Features include:

- **User Authentication** - Secure signup and login with JWT
- **Note Management** - Create, edit, and delete notes
- **Version Control** - Automatic tracking of all note changes
- **Drafts** - Save work-in-progress notes as drafts
- **Media Support** - Attach images and files to notes
- **Audit Logging** - Track all user actions
- **Role-based Access** - Permission-based access control

## 🚀 Quick Start

### Prerequisites

- Node.js (v20+)
- MySQL 8.0+
- npm or yarn

### Development

1. Install dependencies:
```bash
npm install
cd frontend && npm install && cd ..
```

2. Set up environment variables:
```bash
cp .env.example .env
# Update .env with your database credentials
```

3. Run database migrations:
```bash
npm run migrate
```

4. Start development server (both backend and frontend):
```bash
npm run dev
```

The application will be available at `http://localhost:4002`

### Production Build

1. Build the application:
```bash
npm run build
```

2. Set environment variables for production:
```bash
export NODE_ENV=production
# Update .env with production database and secrets
```

3. Start the production server:
```bash
npm start
```

## 📁 Project Structure

```
.
├── src/                     # Backend source code
│   ├── config/             # Configuration files
│   ├── controllers/        # Route handlers
│   ├── middlewares/        # Express middlewares
│   ├── models/             # Database models
│   ├── repositories/       # Data access layer
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── migrations/         # Database migrations
│   └── index.ts            # Server entry point
├── frontend/               # Vue.js frontend
│   ├── src/               # Frontend source code
│   ├── public/            # Static assets
│   ├── vite.config.ts     # Vite configuration
│   └── package.json       # Frontend dependencies
├── docker-compose.yml      # Docker setup
└── package.json            # Backend dependencies
```

## 🛠 Tech Stack

**Backend:**
- Express.js 5.x
- TypeScript
- Sequelize ORM
- MySQL 2.x
- JWT Authentication

**Frontend:**
- Vue.js 3.5.x
- Vite
- Tailwind CSS
- Axios

## 📚 API Documentation

API endpoints are available at `/api` when the server is running.

Main endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get note details
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## 📝 License

ISC
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

The API will be available at `http://localhost:4002`

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
   PORT=4002
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

   The API will be available at `http://localhost:4002`
   
   Swagger documentation: `http://localhost:4002/api-docs`

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
