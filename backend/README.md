# SmartBiz GST Backend API

A Node.js/Express backend API for the SmartBiz GST application, providing endpoints for user management, authentication, and quick add functionality.

## Features

- **User Authentication & Management**
  - User registration and login
  - JWT-based authentication
  - Profile management
  - Admin user management

- **Quick Add System**
  - Create temporary product listings and promotions
  - Image upload and processing
  - Like/view tracking
  - Automatic expiration handling
  - Admin approval system

- **Database Integration**
  - PostgreSQL database
  - Automated migrations
  - Optimized queries with indexes

- **Security Features**
  - Password hashing with bcrypt
  - JWT token authentication
  - Rate limiting
  - Input validation
  - CORS protection

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **File Upload**: Multer + Sharp
- **Validation**: Express-validator
- **Security**: Helmet, CORS
- **Scheduling**: Node-cron

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=smartbiz_gst
   DB_USER=your_username
   DB_PASSWORD=your_password

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # File Upload Configuration
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH=./uploads

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE smartbiz_gst;
   ```

4. **Run database migrations**
   ```bash
   npm run migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Quick Add
- `POST /api/quick-add/create` - Create new quick add request
- `GET /api/quick-add/all` - Get all quick add requests (with filtering)
- `GET /api/quick-add/user/:userId` - Get user's quick add requests
- `GET /api/quick-add/:id` - Get single quick add request
- `POST /api/quick-add/:id/like` - Like/unlike quick add request
- `DELETE /api/quick-add/:id` - Delete quick add request

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id/deactivate` - Deactivate user
- `PUT /api/users/:id/activate` - Activate user
- `DELETE /api/users/:id` - Delete user

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations
- `npm test` - Run tests

## Cron Jobs

The application includes automated cron jobs for:

- **Expired Quick Adds Check**: Runs every hour to mark expired quick adds
- **Old Data Cleanup**: Runs daily at 2 AM to clean up old expired quick adds
- **Expiring Notifications**: Runs daily at 9 AM to check for expiring quick adds

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Helmet security headers

## License

MIT License
