# 🎓 Student Life OS

[![.NET](https://img.shields.io/badge/.NET-8.0-purple.svg)](https://dotnet.microsoft.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![Entity Framework](https://img.shields.io/badge/Entity%20Framework-Core-8.0-green.svg)](https://learn.microsoft.com/en-us/ef/core/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)

A comprehensive full-stack web application designed to help students manage their daily life efficiently. Student Life OS provides a unified dashboard for managing tasks, expenses, shared expenses, and personal goals in one powerful platform.

## 🚀 Features

### Phase 1 (Current)
- 🔐 **Secure Authentication** - User registration and login with JWT tokens
- 🗄️ **Database Integration** - PostgreSQL with Entity Framework Core
- 🏗️ **Clean Architecture** - Scalable and maintainable code structure
- 📚 **Comprehensive Documentation** - Well-documented APIs and setup process
- 🎨 **Modern Frontend** - React 18 with TypeScript and Tailwind CSS
- 🌙 **Dark Mode Support** - Complete dark/light theme with localStorage persistence
- 📱 **Responsive Design** - Mobile-first responsive dashboard layout
- 🧩 **Component Architecture** - Modular, reusable React components
- 📋 **Task Management** - Full CRUD task system with localStorage persistence
- 🛡️ **Protected Routing** - Layout-based routing with authentication guards

### Future Scope
- 💰 **Expense Tracker** - Personal and shared expense management
- 📅 **Daily Planner** - Task scheduling and time management
- 👥 **Split Expense Module** - Group expense sharing and settlements
- 🤖 **AI-based Insights** - Smart recommendations and analytics
- 🎯 **PG Finder Module** - Personal growth and goal tracking

## 🛠️ Tech Stack

### Backend
- **.NET 8 Web API** - Modern, high-performance web framework
- **PostgreSQL 15** - Robust relational database
- **Entity Framework Core** - Powerful ORM for data access
- **JWT Authentication** - Secure token-based authentication
- **BCrypt** - Industry-standard password hashing

### Frontend
- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework with dark mode
- **React Router** - Client-side routing with protected routes
- **Local Storage** - Client-side data persistence

## 📁 Project Structure

```
Student Life OS/
├── Server/                     # Backend API
│   ├── Controllers/             # API endpoint definitions
│   │   └── AuthController.cs  # Authentication endpoints
│   ├── Services/               # Business logic layer
│   │   └── AuthService.cs     # Authentication service
│   ├── Repositories/           # Data access layer
│   │   ├── IUserRepository.cs  # Repository interface
│   │   └── UserRepository.cs  # Repository implementation
│   ├── DTOs/                 # Data transfer objects
│   │   ├── AuthResponse.cs     # Authentication response
│   │   ├── LoginRequest.cs     # Login request model
│   │   └── RegisterRequest.cs # Registration request model
│   ├── Data/                  # Database configuration
│   │   ├── ApplicationDbContext.cs # EF Core context
│   │   └── DataSeeder.cs     # Database seeding
│   ├── Entities/              # Database entities
│   │   └── User.cs          # User entity
│   ├── Middleware/            # Custom middleware
│   │   └── ErrorHandlingMiddleware.cs # Global error handling
│   └── Program.cs             # Application entry point
└── Client/                   # Frontend React App
    ├── public/                # Static assets
    ├── src/
    │   ├── components/        # Reusable React components
    │   │   ├── DashboardLayout.tsx  # Main dashboard layout
    │   │   ├── Sidebar.tsx          # Navigation sidebar
    │   │   ├── Navbar.tsx           # Top navigation bar
    │   │   ├── DarkModeToggle.tsx   # Theme toggle component
    │   │   ├── TaskItem.tsx         # Individual task component
    │   │   ├── Card.tsx             # Dashboard metric cards
    │   │   ├── Input.tsx            # Form input component
    │   │   ├── Button.tsx           # Button component
    │   │   └── ProtectedRoute.tsx    # Authentication guard
    │   ├── pages/             # Page components
    │   │   ├── LoginPage.tsx         # Login page
    │   │   ├── RegisterPage.tsx       # Registration page
    │   │   ├── DashboardPage.tsx      # Main dashboard
    │   │   ├── TaskPage.tsx          # Task management page
    │   │   ├── ExpensesPage.tsx       # Expense tracking (placeholder)
    │   │   ├── SplitExpensesPage.tsx  # Split expenses (placeholder)
    │   │   └── GoalsPage.tsx         # Goals management (placeholder)
    │   ├── services/          # API services
    │   │   └── authService.ts       # Authentication service
    │   ├── App.tsx            # Main App component with routing
    │   ├── index.css          # Global styles
    │   └── index.tsx         # App entry point
    ├── package.json           # Dependencies and scripts
    ├── tailwind.config.js     # Tailwind configuration
    └── tsconfig.json         # TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [PostgreSQL 15+](https://www.postgresql.org/download/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) or [VS Code](https://code.visualstudio.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TandelPriyanshi/Student-Life-OS
   cd Student-Life-OS
   ```

2. **Configure PostgreSQL**
   - Create a database named `StudentLifeOS`
   - Update connection string in `Server/appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=StudentLifeOS;Username=postgres;Password=your_password"
     }
   }
   ```

3. **Run EF Migrations**
   ```bash
   cd Server/Server
   dotnet restore
   dotnet ef database update
   ```

4. **Start the Application**
   ```bash
   dotnet run
   ```

The API will be available at `https://localhost:7000` and `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "User Name",
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

### Interactive Documentation
- **Swagger UI**: Available at `https://localhost:7000` (development)
- **OpenAPI Spec**: `/swagger/v1/swagger.json`

## 🧪 Testing

### Test User Credentials
The application automatically seeds a test user:
- **Email**: `test@studentlifeos.com`
- **Password**: `TestPassword123!`

### API Testing
Use the provided `API-Tests.http` file or Swagger UI to test endpoints.

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt for secure password storage
- **Input Validation**: Comprehensive request validation
- **CORS Configuration**: Secure cross-origin resource sharing
- **Error Handling**: Global error handling middleware

## 🏗️ Architecture

The application follows **Clean Architecture** principles:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic and orchestration
- **Repositories**: Manage data access and database operations
- **DTOs**: Define data transfer objects for API contracts
- **Entities**: Represent database tables and relationships

## 🚧 Development Status

### ✅ Completed
- [x] User authentication system
- [x] JWT token generation
- [x] PostgreSQL database integration
- [x] Clean architecture implementation
- [x] API documentation with Swagger
- [x] Error handling middleware
- [x] Data seeding for testing
- [x] React frontend development
- [x] Dark mode implementation
- [x] Responsive dashboard layout
- [x] Task management system
- [x] Protected routing
- [x] Component architecture

### � In Progress
- [ ] Daily planner functionality
- [ ] User profile management
- [ ] Expense tracking module

### 📋 Planned
- [ ] Split expense system
- [ ] AI-powered insights
- [ ] Personal growth tracking

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Follow C# coding conventions
- Write unit tests for new features
- Update documentation for API changes
- Use semantic commit messages

**Built with ❤️ for students who want to organize their life better**
