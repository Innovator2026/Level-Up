# Level Up — Pilot App

Mentorship platform for newcomers to Canada.

---

## Deploy to Vercel (5 minutes)

### Option A — Drag and drop (easiest)

1. Go to **vercel.com** and create a free account
2. Click **"Add New Project"**
3. Click **"Upload"** and drag this entire `levelup` folder
4. Click **Deploy**
5. Done — Vercel gives you a live URL like `levelup.vercel.app`

### Option B — Via GitHub (recommended for ongoing updates)

1. Create a free account at **github.com**
2. Click **"New repository"** → name it `levelup` → Create
3. Upload all files in this folder to the repo
4. Go to **vercel.com** → New Project → Import from GitHub
5. Select your repo → Deploy

---

## Share with testers

Send them your Vercel URL. To install on phone:

**iPhone:**
1. Open the URL in **Safari**
2. Tap the Share icon (box with arrow)
3. Tap **"Add to Home Screen"**
4. Tap Add

**Android:**
1. Open in **Chrome**
2. Tap the 3 dots menu
3. Tap **"Add to Home Screen"**

---

## Update the app

Edit `src/App.js`, push to GitHub, Vercel redeploys automatically.

---

## Project structure

```
levelup/
├── public/
│   ├── index.html       ← HTML shell
│   └── manifest.json    ← Makes it installable as app
├── src/
│   ├── index.js         ← React entry point
│   └── App.js           ← Your entire app
├── package.json         ← Dependencies
├── vercel.json          ← Vercel config
└── .gitignore
```
