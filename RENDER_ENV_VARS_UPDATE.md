# ✅ FINAL STEPS - Update Render Environment Variables

## 🎯 Your Deployment URLs
Based on your screenshots:
- **Backend:** `https://edudbt-backend.onrender.com`
- **Frontend:** `https://edudbt-sih-1.onrender.com`

---

## 📋 Step 1: Update Backend Environment Variables

1. Go to: https://dashboard.render.com
2. Click on **edudbt-backend** service
3. Click **Environment** tab
4. **Update/Add these TWO variables:**

### Remove trailing slash from CORS_ORIGIN:
```
CORS_ORIGIN=https://edudbt-sih-1.onrender.com
```
(Remove the `/` at the end if it's there)

### Add FRONTEND_URL:
```
FRONTEND_URL=https://edudbt-sih-1.onrender.com
```

5. Click **Save Changes**
6. Wait 2-3 minutes for backend to redeploy

---

## 📋 Step 2: Verify Frontend Environment Variables

1. Go to: https://dashboard.render.com
2. Click on **edudbt-sih-1** (frontend) static site
3. Click **Environment** tab
4. **Verify this variable exists and is correct:**

```
REACT_APP_API_URL=https://edudbt-backend.onrender.com/api
```

✅ **This looks correct in your screenshot!**

5. If you need to change anything, click **Save Changes** then:
   - Go to **Manual Deploy** section
   - Click **Clear build cache & deploy**

---

## 🔍 Step 3: Check Backend Logs

After backend redeploys (2-3 minutes):

1. Go to **edudbt-backend** service
2. Click **Logs** tab
3. Look for these startup messages:
   ```
   🔐 CORS Configuration:
   Allowed Origins: ['http://localhost:3000', 'http://localhost:3001', 'https://edudbt-sih-1.onrender.com', 'https://edudbt-sih-1.onrender.com']
   Environment: production
   ```

---

## 🧪 Step 4: Test the Chatbot

1. Open: https://edudbt-sih-1.onrender.com
2. Press **F12** (open DevTools)
3. Go to **Console** tab
4. Click the chatbot icon (purple button)
5. Look for this message:
   ```
   🤖 Chatbot Initialized: {
     sessionId: "...",
     apiUrl: "https://edudbt-backend.onrender.com/api",
     environment: "production",
     hasToken: true/false
   }
   ```

6. Send a test message: "Hello"
7. Check for:
   - ✅ Response appears (1-3 seconds)
   - ✅ No errors in console
   - ✅ Network tab shows successful POST to `https://edudbt-backend.onrender.com/api/chatbot/message`

---

## 🔍 Step 5: If There Are Errors

### Check Backend Logs:
Look for when you send a message:
- `✅ CORS: Allowing origin: https://edudbt-sih-1.onrender.com` - **GOOD!**
- `❌ CORS: Blocking origin: ...` - **Check the URLs match exactly**

### Check Frontend Console:
- Look for network errors
- Check the API URL in the request
- Verify no CORS errors

---

## ✅ Success Criteria

Chatbot is working when you see:
- ✅ Backend logs: `✅ CORS: Allowing origin: https://edudbt-sih-1.onrender.com`
- ✅ Frontend console: `🤖 Chatbot Initialized: { apiUrl: "https://edudbt-backend.onrender.com/api" }`
- ✅ Chatbot responds to messages
- ✅ No CORS errors in browser console
- ✅ Works for all users (not just you)

---

## 📝 What Changed?

### Code Changes Pushed:
1. ✅ Backend CORS now normalizes URLs (removes trailing slashes for comparison)
2. ✅ Added debug logging to backend (shows CORS decisions in logs)
3. ✅ Added debug logging to frontend (shows API URL being used)

### Environment Variables to Update:
1. ✅ Backend: Remove trailing slash from `CORS_ORIGIN`
2. ✅ Backend: Add `FRONTEND_URL` variable
3. ✅ Frontend: Already correct!

---

## 🆘 Still Having Issues?

Share these 3 screenshots:
1. **Backend logs** (after sending a chatbot message)
2. **Frontend browser console** (F12 → Console tab)
3. **Frontend network tab** (F12 → Network tab, filter by "chatbot")

---

**Last Updated:** October 3, 2025
**Status:** ✅ Code pushed, waiting for environment variable updates
