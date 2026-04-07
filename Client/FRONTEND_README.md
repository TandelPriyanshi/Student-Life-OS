# Student Life OS - Frontend Setup

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd Client
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
Client/
├── public/
│   ├── vite.svg
│   └── react.svg
├── src/
│   ├── components/
│   │   ├── Input.tsx          # Reusable input component
│   │   ├── Button.tsx         # Reusable button component
│   │   └── ProtectedRoute.tsx  # Route protection wrapper
│   ├── pages/
│   │   ├── RegisterPage.tsx # User registration page
│   │   ├── LoginPage.tsx       # User login page
│   │   └── DashboardPage.tsx  # Main dashboard
│   ├── services/
│   │   └── authService.ts       # API service functions
│   ├── App.tsx                   # Main app component
│   └── index.css                 # Tailwind styles
├── package.json                  # Dependencies and scripts
└── vite.config.ts               # Vite configuration
```

## 🔧 API Integration

### Base URL Configuration
Update the API base URL in `src/services/authService.ts`:

```typescript
const API_BASE_URL = 'https://localhost:7246/api';
```

### Available Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

## 🎨 Components Usage

### Input Component
```tsx
<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  error={errorMessage}
  required
/>
```

### Button Component
```tsx
<Button
  type="submit"
  loading={isLoading}
  className="w-full"
>
  Sign In
</Button>
```

### Protected Route
```tsx
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

## 🔐 Testing

### 1. Backend Connection Test
Run the API test script:
```bash
node test-api.js
```

### 2. Browser Testing
1. Open browser to `http://localhost:5173`
2. Try registering a new user
3. Try logging in with test credentials:
   - Email: `test@studentlifeos.com`
   - Password: `TestPassword123!`

## 🐛 Troubleshooting

### Common Issues

#### CORS Errors
- **Backend**: Ensure CORS allows `http://localhost:5173`
- **Frontend**: Verify API_BASE_URL matches backend URL

#### Network Issues
- Check if backend is running on correct port (7246)
- Verify firewall isn't blocking the connection

#### Development Issues
- Clear browser cache
- Check browser console for errors
- Verify API responses in Network tab

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Create `.env.production`:
```env
VITE_API_BASE_URL=https://your-production-url.com/api
```

## 🔒 Security Notes

- Never commit sensitive data like API keys
- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting on backend

## 📱 Features Status

### ✅ Completed
- [x] React + TypeScript setup
- [x] Tailwind CSS styling
- [x] Authentication pages (Register/Login)
- [x] Protected routes
- [x] API service integration
- [x] Form validation
- [x] Loading states
- [x] Error handling
- [x] Responsive design

### 🔄 In Progress
- [ ] Dashboard functionality
- [ ] User profile management
- [ ] Academic features
- [ ] Personal finance tracking
- [ ] Goal setting system

## 🎯 Next Steps

1. Complete the dashboard page with actual functionality
2. Add user profile management
3. Implement academic features (courses, assignments, grades)
4. Add personal finance tracking
5. Set up continuous deployment
6. Add comprehensive testing
