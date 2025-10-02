# 🚀 Render Deployment Guide

## 📋 Prerequisites
- GitHub repository pushed: ✅ https://github.com/Omega-Aura/EduDBT-SIH.git
- MongoDB Atlas database ready
- Google Gemini API key

## 🎯 Deployment Steps

### Step 1: Deploy Backend (Web Service)

1. **Go to Render Dashboard:** https://render.com/
2. **Click "New" → "Web Service"**
3. **Connect GitHub repository:** `Omega-Aura/EduDBT-SIH`

#### Backend Configuration:

| Field | Value |
|-------|--------|
| **Name** | `edudbt-backend` |
| **Region** | `Based on your region` |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

#### Environment Variables:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://Admin:12345qwert@cluster0.tvzi0xg.mongodb.net/aadhaar-dbt?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-in-production-32-chars-min
JWT_EXPIRES_IN=24h
GEMINI_API_KEY=AIzaSyBrUJkGYK5uEeuulBbhpS53gZdAuEpFhO8
CORS_ORIGIN=http://localhost:3000
FRONTEND_URL=https://your-frontend-url.onrender.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 2: Deploy Frontend (Static Site)

1. **Click "New" → "Static Site"**
2. **Connect same GitHub repository:** `Omega-Aura/EduDBT-SIH`

#### Frontend Configuration:

| Field | Value |
|-------|--------|
| **Name** | `edudbt-frontend` |
| **Branch** | `main` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install --legacy-peer-deps && npm run build` |
| **Publish Directory** | `build` |

#### Environment Variables:
```
REACT_APP_API_URL=https://edudbt-backend.onrender.com/api
REACT_APP_ENVIRONMENT=production
REACT_APP_VERSION=1.0.0
```

### Step 3: Update URLs After Deployment

After both services deploy, update:

1. **Backend Environment Variable:**
   - `FRONTEND_URL=https://edudbt-frontend.onrender.com`

2. **Frontend Environment Variable:**
   - `REACT_APP_API_URL=https://edudbt-backend.onrender.com/api`

## 🔗 Expected URLs

- **Backend API:** `https://edudbt-backend.onrender.com/api`
- **Frontend App:** `https://edudbt-frontend.onrender.com`
- **Health Check:** `https://edudbt-backend.onrender.com/api/health`

## ✅ Post-Deployment Testing

1. **Backend Health Check:**
   ```bash
   curl https://edudbt-backend.onrender.com/api/health
   ```

2. **Test API Endpoints:**
   ```bash
   curl https://edudbt-backend.onrender.com/api/content
   ```

3. **Frontend Access:**
   - Open: https://edudbt-frontend.onrender.com
   - Register new account
   - Test chatbot
   - Verify articles load

## 🛠️ Troubleshooting

### Backend Issues:
- Check logs in Render dashboard
- Verify MongoDB Atlas IP whitelist (add 0.0.0.0/0)
- Check environment variables

### Frontend Issues:
- Verify API URL points to backend
- Check browser console for CORS errors
- Ensure build completes successfully

### Common Fixes:
1. **CORS Errors:** Update `FRONTEND_URL` in backend
2. **API Not Found:** Check `REACT_APP_API_URL` in frontend
3. **Build Fails:** Check Node.js version compatibility

## 📊 Free Tier Limits

**Render Free Tier:**
- 750 hours/month per service
- Sleeps after 15 minutes of inactivity
- Cold start ~30 seconds

**Recommendations:**
- Use cron job to keep services awake
- Consider upgrading for production use

## 🎯 Success Indicators

✅ Backend health check returns 200
✅ Frontend loads without errors
✅ User registration works
✅ Articles display correctly
✅ Chatbot responds
✅ Multi-language switching works

---

**Support:** Check Render logs for detailed error messages
**Documentation:** https://render.com/docs
