# Quick Deployment Checklist

## 🚀 Fast Track Deployment

### Backend (Render - Recommended)

1. **Go to**: https://dashboard.render.com
2. **Click**: "New +" → "Web Service"
3. **Connect**: Your GitHub repo
4. **Settings**:
   - Name: `fm-support-backend`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Plan: **Free**
5. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   GEMINI_API_KEY=your_key_here
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
6. **Deploy** → Copy the URL (e.g., `https://fm-support-backend.onrender.com`)

---

### Frontend (Vercel)

1. **Go to**: https://vercel.com
2. **Click**: "Add New..." → "Project"
3. **Import**: Your GitHub repo
4. **Settings**:
   - Root Directory: `fm-support-frontend`
   - Framework: Vite (auto-detected)
5. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   VITE_GEMINI_API_KEY=your_key_here
   ```
   ⚠️ **No trailing slash** on VITE_API_URL!
6. **Deploy** → Done! 🎉

---

## ✅ Post-Deployment Checklist

- [ ] Test frontend URL loads
- [ ] Test API calls work (check browser console)
- [ ] Test AI assistant
- [ ] Verify CORS is working (no CORS errors in console)

---

## 🔧 Common Issues

**CORS Error?**
- Add `FRONTEND_URL` to backend env vars
- Make sure URL matches exactly (no trailing slash)

**API not working?**
- Check `VITE_API_URL` has no trailing slash
- Verify backend is running (check Render/Railway dashboard)
- Wait 30-60 seconds if Render service was sleeping

**Build failing?**
- Check build logs
- Verify all dependencies in package.json
- Ensure Node.js version is compatible

---

## 📝 Environment Variables Reference

### Backend (Render/Railway)
```
NODE_ENV=production
PORT=10000 (Render) or auto (Railway)
GEMINI_API_KEY=your_key
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com
VITE_GEMINI_API_KEY=your_key
```

---

Need more details? See `DEPLOYMENT_GUIDE.md` for comprehensive instructions.

