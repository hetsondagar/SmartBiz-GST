# Vercel Deployment Configuration

## ⚠️ Important Setup Step

Since your project has a `frontend/` subdirectory, you need to configure the **Root Directory** in Vercel Dashboard:

### Steps:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **General**
3. Scroll to **Root Directory**
4. Click **Edit**
5. Enter: `frontend`
6. Click **Save**

This tells Vercel to treat the `frontend` folder as the project root.

## Alternative: Simplified vercel.json

If you set Root Directory to `frontend` in the dashboard, you can use this simpler `vercel.json`:

```json
{
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Current Configuration

The current `vercel.json` uses explicit `cd frontend` commands, which should work if:
- ✅ The frontend folder exists in your GitHub repo
- ✅ All files are committed and pushed

## Verification

After setting Root Directory in dashboard:
1. The build will run from `frontend/` directory
2. Output will be in `frontend/dist`
3. All routes will work with SPA routing

