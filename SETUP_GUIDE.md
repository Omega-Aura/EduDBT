# 🚀 Quick Setup Guide

This guide will help you set up the Aadhaar DBT Awareness Platform on your local machine in under 10 minutes.

## ⚡ Quick Start (TL;DR)

```bash
# 1. Clone and install
git clone <repository-url>
cd "SIH MERN Prototype"

# 2. Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and Gemini API Key
node seedData.js
npm run dev

# 3. Frontend setup (new terminal)
cd frontend
npm install
cp .env.example .env
npm start

# 4. Open http://localhost:3000
```

## 📋 Step-by-Step Setup

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd "SIH MERN Prototype"
```

### Step 2: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account (if you don't have one)
3. Create a new cluster (free tier is fine)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Replace `<password>` with your actual password
7. Add database name at the end: `/aadhaar-dbt`

### Step 3: Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

### Step 4: Backend Configuration

```bash
cd backend
npm install
```

Create `.env` file:

```bash
cp .env.example .env
```

Edit `backend/.env`:

```properties
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/aadhaar-dbt?retryWrites=true&w=majority
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
JWT_SECRET=change-this-to-a-random-string-min-32-chars
```

**Generate a secure JWT_SECRET:**

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or online: https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
```

### Step 5: Seed Database

```bash
cd backend
node seedData.js
```

Expected output:

```
✅ Database connected
✅ 11 articles created
✅ Admin user created
✅ Data seeding completed!

Admin credentials:
Email: admin@dbtaware.gov.in
Password: Admin@123
```

### Step 6: Start Backend Server

```bash
npm run dev
```

You should see:

```
Server running on port 5000
MongoDB connected
```

### Step 7: Frontend Configuration

Open a **new terminal**:

```bash
cd frontend
npm install
```

Create `.env` file:

```bash
cp .env.example .env
```

The default values should work:

```properties
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
REACT_APP_VERSION=1.0.0
```

### Step 8: Start Frontend Server

```bash
npm start
```

Browser should automatically open http://localhost:3000

If not, manually open: **http://localhost:3000**

## ✅ Verify Installation

### Test Backend API

Open http://localhost:5000/api/content in your browser.

You should see JSON response with articles.

### Test Frontend

1. **Home Page**: http://localhost:3000

   - Should show welcome page with navigation

2. **Register**: http://localhost:3000/register

   - Create a new student account
   - Fill all required fields

3. **Login**: http://localhost:3000/login

   - Use your newly created account
   - Or use admin: `admin@dbtaware.gov.in` / `Admin@123`

4. **Dashboard**: http://localhost:3000/dashboard

   - Should show 0 articles read (for new users)
   - Progress bar at 0%

5. **Learning Center**: http://localhost:3000/learning-center

   - Should display 11 articles

6. **Open an Article**: Click any article

   - Article should open
   - After reading, dashboard should show +1 article

7. **AI Chatbot**: Click chatbot icon (bottom-right)
   - Type: "What is Aadhaar?"
   - Should get AI response in 1-2 seconds

## 🔧 Troubleshooting

### Backend won't start

**Error: "Port 5000 already in use"**

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Error: "MongoDB connection failed"**

- Check MongoDB Atlas IP whitelist
- Go to Atlas → Network Access → Add IP Address → Add Current IP
- Or allow all: `0.0.0.0/0` (not recommended for production)
- Verify connection string format
- Make sure password is URL-encoded (special chars like @, # need encoding)

### Frontend won't start

**Error: "Something is already running on port 3000"**

Press `n` when asked "Would you like to run the app on another port instead?"

Then change port:

```bash
# Windows PowerShell
$env:PORT=3001; npm start

# Mac/Linux
PORT=3001 npm start
```

Update `backend/.env`:

```properties
CORS_ORIGIN=http://localhost:3001
```

### Chatbot not responding

**Check Gemini API Key:**

1. Verify `GEMINI_API_KEY` in `backend/.env`
2. Test API key: https://aistudio.google.com/app/apikey
3. Make sure you haven't exceeded free tier limits

**Check browser console:**

- Press F12 → Console tab
- Look for red error messages

### Articles not showing

**Re-seed database:**

```bash
cd backend
node seedData.js
```

**Check MongoDB connection:**

```bash
# Test connection
node -e "require('mongoose').connect(process.env.MONGODB_URI || 'YOUR_MONGODB_URI').then(() => console.log('✅ Connected')).catch(err => console.log('❌ Error:', err.message))"
```

## 🎯 Next Steps

### 1. Create Your First Student Account

- Go to http://localhost:3000/register
- Fill in all fields
- Use a strong password (min 8 chars, uppercase, lowercase, number, special char)

### 2. Explore Features

✅ **Dashboard** - View your learning progress
✅ **Learning Center** - Read educational articles
✅ **Profile** - Update your details
✅ **AI Chatbot** - Ask questions about Aadhaar/DBT
✅ **Quizzes** - Test your knowledge (seed quiz data first)

### 3. Test Multi-language

- Click language selector in header
- Try switching to Hindi, Tamil, or any of 13 languages
- UI should translate instantly

### 4. Test Progress Tracking

1. Read 3 articles
2. Go back to Dashboard
3. Should show "3 Articles Read"
4. Progress bar should update

### 5. Seed Quiz Data (Optional)

```bash
cd backend
node seedQuizData.js
```

Then go to Learning Center → Quizzes tab

## 📱 Testing on Mobile

### Same Network (WiFi)

1. Find your computer's IP address:

```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

2. Look for IPv4 address (e.g., 192.168.1.100)

3. Update `backend/.env`:

```properties
CORS_ORIGIN=http://192.168.1.100:3000
```

4. Update `frontend/.env`:

```properties
REACT_APP_API_URL=http://192.168.1.100:5000/api
```

5. Restart both servers

6. On mobile, open: `http://192.168.1.100:3000`

## 🆘 Getting Help

### Check Logs

**Backend logs:**

```bash
cd backend
npm run dev
# Watch for errors in terminal
```

**Frontend logs:**

- Open browser
- Press F12 → Console tab
- Look for errors (red messages)

### Common Solutions

| Issue                | Solution                                     |
| -------------------- | -------------------------------------------- |
| White screen         | Check browser console for errors             |
| API not responding   | Verify backend is running on port 5000       |
| Login fails          | Check MongoDB connection, verify user exists |
| Chatbot error        | Check Gemini API key, check rate limits      |
| Translations missing | Check `frontend/public/locales/` folder      |

### Still Need Help?

1. Check existing GitHub issues
2. Create a new issue with:
   - Error message (full text)
   - Console logs
   - Steps to reproduce
   - Your environment (OS, Node version)

## 🎓 Learning Resources

- [MongoDB Atlas Tutorial](https://www.mongodb.com/docs/atlas/getting-started/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/en/starter/installing.html)
- [Google Gemini AI](https://ai.google.dev/)

---

**Setup Time:** ~10 minutes
**Difficulty:** Beginner-friendly
**Support:** GitHub Issues

Good luck! 🚀
