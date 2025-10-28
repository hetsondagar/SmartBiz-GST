# SmartBiz GST

A comprehensive GST management, inventory tracking, and local business networking platform for small businesses and shopkeepers in India.

## Features

- **Complete GST Management** - Automated GST filing with OCR bill scanning
- **Inventory Management** - Track stock levels, set alerts, manage products
- **Sales Analytics** - Monitor sales, generate invoices, analyze revenue
- **Marketing Tools** - Create and manage advertising campaigns
- **Business Network** - Connect with suppliers, wholesalers, and retailers
- **Market Insights** - AI-powered insights on trending products
- **Business Building** - Plan new ventures with AI-powered intelligence
- **AI Assistant** - Voice commands and smart suggestions

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: Shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Charts**: Recharts
- **State Management**: React Query, React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or bun)

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## Building for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

Build output will be in the `frontend/dist` directory.

## Deploy to Vercel

### Option 1: Automatic Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will automatically detect the configuration

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Project Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── lib/          # Utilities and helpers
│   ├── hooks/        # Custom React hooks
│   └── index.css     # Global styles
├── package.json
├── vite.config.ts
└── vercel.json       # Vercel configuration
```

## Configuration

The app uses Vercel's automatic configuration with:

- **Framework**: Vite
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **SPA Routing**: All routes redirect to `index.html` for client-side routing

## Environment Variables

Create a `.env.local` file in the `frontend` directory for local development:

```env
VITE_APP_NAME=SmartBiz GST
```

## License

© 2025 SmartBiz GST. All rights reserved.

