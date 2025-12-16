# Free Hosting Deployment Guide

This guide will help you deploy your FM Support App for free using:
- **Frontend**: Vercel (free tier)
- **Backend**: Render or Railway (free tier)

---

## Prerequisites

1. GitHub account
2. Vercel account (sign up at https://vercel.com)
3. Render account (sign up at https://render.com) OR Railway account (sign up at https://railway.app)
4. Your Gemini API key

---

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

---

## Step 2: Deploy Backend (Choose ONE: Render OR Railway)

### Option A: Deploy to Render (Recommended for Free Tier)

#### 2.1 Create Render Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository

#### 2.2 Configure Render Service

- **Name**: `fm-support-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: Leave empty (or set to root if needed)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: **Free** (select this)

#### 2.3 Set Environment Variables in Render

Click on **"Environment"** tab and add:

```
NODE_ENV=production
PORT=10000
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important**: Render free tier services spin down after 15 minutes of inactivity. They'll wake up automatically when a request comes in (may take 30-60 seconds).

#### 2.4 Deploy

Click **"Create Web Service"**. Render will:
1. Install dependencies
2. Build your TypeScript code
3. Start the server

#### 2.5 Get Your Backend URL

Once deployed, you'll get a URL like: `https://fm-support-backend.onrender.com`

**Note**: Save this URL - you'll need it for the frontend!

---

### Option B: Deploy to Railway

#### 2.1 Create Railway Project

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Select your repository

#### 2.2 Configure Railway Service

Railway will auto-detect your Node.js app. It will use the `railway.json` config file.

#### 2.3 Set Environment Variables

1. Click on your service
2. Go to **"Variables"** tab
3. Add these variables:

```
NODE_ENV=production
GEMINI_API_KEY=your_gemini_api_key_here
```

Railway automatically sets `PORT` - you don't need to set it manually.

#### 2.4 Deploy

Railway will automatically:
1. Install dependencies
2. Build your code
3. Start the server

#### 2.5 Get Your Backend URL

1. Click on your service
2. Go to **"Settings"** → **"Generate Domain"**
3. You'll get a URL like: `https://fm-support-backend-production.up.railway.app`

**Note**: Railway free tier gives you $5 credit/month. After that, services pause.

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Project

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Select your repository

### 3.2 Configure Vercel Project

- **Framework Preset**: Vite (should auto-detect)
- **Root Directory**: `fm-support-frontend`
- **Build Command**: `npm run build` (should auto-detect)
- **Output Directory**: `dist` (should auto-detect)
- **Install Command**: `npm install` (should auto-detect)

### 3.3 Set Environment Variables

Click **"Environment Variables"** and add:

```
VITE_API_URL=https://your-backend-url.onrender.com
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Important**: 
- Replace `https://your-backend-url.onrender.com` with your actual Render/Railway backend URL
- Make sure there's **NO trailing slash** at the end of the URL

### 3.4 Deploy

Click **"Deploy"**. Vercel will:
1. Install dependencies
2. Build your React app
3. Deploy to a global CDN

### 3.5 Get Your Frontend URL

Once deployed, you'll get a URL like: `https://fm-support-app.vercel.app`

---

## Step 4: Update CORS in Backend (If Needed)

If you encounter CORS errors, you may need to update your backend CORS configuration to allow your Vercel domain.

Update `src/index.ts`:

```typescript
import cors from "cors";

const app = express();

// Update CORS to allow your Vercel domain
const allowedOrigins = [
  'http://localhost:5173', // Local development
  process.env.FRONTEND_URL, // Your Vercel URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

Then add `FRONTEND_URL` to your backend environment variables:
```
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## Step 5: Test Your Deployment

1. Visit your Vercel frontend URL
2. Test the application:
   - Try creating a ticket
   - Test the AI assistant
   - Verify API calls are working

---

## Troubleshooting

### Backend Issues

**Render: Service spins down**
- This is normal on the free tier
- First request after inactivity may take 30-60 seconds
- Consider upgrading to paid tier for always-on service

**Railway: Service paused**
- Free tier has $5/month credit limit
- Add payment method to keep service running

**CORS Errors**
- Make sure your backend CORS allows your Vercel domain
- Check that `FRONTEND_URL` environment variable is set correctly

### Frontend Issues

**API calls failing**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check browser console for errors
- Ensure backend URL has no trailing slash

**Environment variables not working**
- Vite requires `VITE_` prefix for environment variables
- Rebuild and redeploy after changing environment variables

### General Issues

**Build failures**
- Check build logs in your hosting platform
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

---

## Free Tier Limitations

### Vercel
- ✅ Unlimited deployments
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ 100GB bandwidth/month
- ⚠️ Serverless functions have execution time limits

### Render (Free Tier)
- ✅ 750 hours/month (enough for always-on)
- ⚠️ Services spin down after 15 min inactivity
- ⚠️ Cold starts take 30-60 seconds
- ⚠️ Limited to 1 web service

### Railway (Free Tier)
- ✅ $5 credit/month
- ⚠️ Services pause when credit runs out
- ⚠️ Need to add payment method for reliability

---

## Recommended Setup

For a production-ready free setup:
- **Frontend**: Vercel (excellent free tier)
- **Backend**: Render (better for free tier, more reliable than Railway free)

---

## Next Steps

1. Set up custom domains (optional)
2. Configure monitoring/analytics
3. Set up CI/CD for automatic deployments
4. Consider upgrading to paid tiers for production use

---

## Support

If you encounter issues:
1. Check the build/deployment logs
2. Verify all environment variables are set
3. Test API endpoints directly using Postman/curl
4. Check browser console for frontend errors

Good luck with your deployment! 🚀

