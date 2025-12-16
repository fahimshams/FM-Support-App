# Fix for Render "Missing Script Build" Error

## Quick Fix

If Render says "missing script build", follow these steps:

### Option 1: Manual Configuration in Render Dashboard

1. Go to your Render service settings
2. Check these settings:

   **Root Directory**: Leave **EMPTY** (or set to `.`)
   
   **Build Command**: 
   ```
   npm install && npm run build
   ```
   
   **Start Command**:
   ```
   npm start
   ```

3. Make sure you're pointing to the **root** of your repository (where `package.json` with the build script is located)

### Option 2: Verify package.json Location

The `package.json` with the build script should be in the **root** of your repository, not in a subdirectory.

Your structure should be:
```
FM-Support-App/
├── package.json          ← This should have the build script
├── src/
│   └── index.ts
├── tsconfig.json
└── render.yaml
```

### Option 3: Alternative Build Command

If the above doesn't work, try this build command in Render:

```
npm install && npx tsc && npm run build
```

Or even simpler, if TypeScript is installed:

```
npm install && npm run build
```

### Option 4: Check Render Service Type

Make sure you created a **Web Service** (not a Static Site or Background Worker).

- Go to Render Dashboard
- Click on your service
- Check the service type is "Web Service"

### Option 5: Recreate the Service

If nothing works:

1. Delete the current service in Render
2. Create a new Web Service
3. Connect your GitHub repo
4. Use these exact settings:
   - **Name**: `fm-support-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Verify package.json Has Build Script

Your `package.json` should have:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

If it's missing, the build script won't work.

---

## Still Not Working?

1. **Check the build logs** in Render - they'll show the exact error
2. **Verify** your `package.json` is committed to Git
3. **Make sure** TypeScript is in `devDependencies` (it should be)
4. **Try** pushing a new commit to trigger a rebuild

---

## Common Mistakes

❌ **Wrong**: Root Directory set to `fm-support-frontend` (that's for frontend)
✅ **Correct**: Root Directory empty or `.` (for backend in root)

❌ **Wrong**: Build command missing `npm install`
✅ **Correct**: `npm install && npm run build`

❌ **Wrong**: Using `npm ci` without package-lock.json
✅ **Correct**: Use `npm install` or ensure package-lock.json exists

