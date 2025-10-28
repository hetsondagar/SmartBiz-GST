# Deployment Guide - Vercel

This guide will help you deploy SmartBiz GST to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Configure Build Settings**
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to project root
cd SmartBiz-GST

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Configuration

The `vercel.json` file is already configured with:

- ✅ SPA routing (all routes redirect to index.html)
- ✅ Build command for frontend folder
- ✅ Cache headers for static assets
- ✅ Output directory setup

## Environment Variables

If you need environment variables (optional):

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add variables like:
   - `VITE_APP_NAME` (optional)
   - `VITE_API_URL` (if you have a backend)

## Post-Deployment

After deployment:

1. ✅ Test all routes work correctly
2. ✅ Verify HTTPS is enabled
3. ✅ Check that static assets load properly
4. ✅ Test mobile responsiveness

## Troubleshooting

### Build Fails

- Check Node.js version (requires 18+)
- Verify all dependencies are in package.json
- Check build logs in Vercel dashboard

### Routes Not Working

- Ensure `vercel.json` has the rewrites configuration
- Verify all routes are client-side (React Router)

### Assets Not Loading

- Check that public folder assets are included
- Verify asset paths use absolute paths starting with `/`

## Performance Optimization

The build is optimized with:

- ✅ Code splitting (vendor, UI, charts, motion chunks)
- ✅ Asset optimization and compression
- ✅ Lazy loading for routes
- ✅ Static asset caching

## Support

For issues, check:
- Vercel documentation: https://vercel.com/docs
- Vite deployment guide: https://vitejs.dev/guide/static-deploy.html

