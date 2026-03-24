# 🚀 AioneTech Lead Capture Setup Guide

## How Leads Will Reach You (3 Layers — Never Miss a Lead)

| Layer | What Happens | Where You See It |
|-------|-------------|-----------------|
| 1️⃣ Google Sheet | Every lead saved automatically | Google Sheets (your CRM) |
| 2️⃣ Email Alert | Instant email with lead details | hello@aionetech.in inbox |
| 3️⃣ WhatsApp | Backup notification on phone | WhatsApp +91 8220627870 |

---

## ⚡ SETUP (One-Time, 5 Minutes)

### Step 1: Create Google Sheet
1. Open https://sheets.google.com
2. Click **+ Blank** to create new spreadsheet
3. Name it **"AioneTech Leads"**
4. In Row 1, type these headers:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Date | Name | Email | Phone | Clinic | Message | Status |

5. Keep this tab open

### Step 2: Create the Apps Script
1. In the same Google Sheet, click **Extensions → Apps Script**
2. Delete everything in the code editor
3. Open the file `google-apps-script.js` from your project
4. Copy ALL the code and paste it in the Apps Script editor
5. Click **💾 Save** (or Ctrl+S)

### Step 3: Deploy as Web App
1. Click **Deploy → New deployment**
2. Click the ⚙️ gear icon next to "Select type"
3. Choose **Web app**
4. Set these settings:
   - **Description**: AioneTech Lead Capture
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. If you see "Google hasn't verified this app":
   - Click **Advanced**
   - Click **Go to AioneTech Lead Capture (unsafe)**
   - Click **Allow**
9. **COPY the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

### Step 4: Add URL to Your Website
1. Open `index.html` in your project
2. Find this line (near the top of the `<script>` section):
   ```js
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL';
   ```
3. Replace `YOUR_GOOGLE_SCRIPT_URL` with the URL you copied:
   ```js
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
4. Save the file

### Step 5: Push to Vercel
Run in terminal:
```bash
cd /Users/raviston/IdeaProjects/aionetech-site
git add -A
git commit -m "Add Google Script URL for lead capture"
git push origin main
```
Vercel auto-deploys in ~1 minute.

---

## ✅ Test It
1. Go to https://aionetech.in
2. Fill the contact form with test data
3. Click "Get Free Audit →"
4. Check:
   - ✅ Google Sheet — new row added?
   - ✅ Email at hello@aionetech.in — notification received?
   - ✅ Success message shown on website?

---

## 📊 Your Lead Dashboard (Google Sheet)

Your Google Sheet becomes your FREE CRM:
- Every lead auto-saved with timestamp
- Filter by date, status, clinic name
- Add columns for: Follow-up Date, Notes, Deal Status
- Share with your team

---

## 🔄 What Happens RIGHT NOW (Before Setup)

Until you complete the Google Script setup, the form still works:
- When someone submits → WhatsApp opens with all lead details
- Lead sends the message → You get it on WhatsApp instantly
- **No lead is lost**

---

## 💡 After Setup — Full Flow

```
Visitor fills form
       ↓
   "Sending..."
       ↓
 ┌─────────────────┐
 │ Google Apps      │ → Lead saved to Sheet
 │ Script API       │ → Email sent to hello@aionetech.in
 └─────────────────┘
       ↓
 ✅ "Thanks! We'll contact you within 2 hours."
       ↓
 (If API fails → WhatsApp fallback opens automatically)
```

## ❓ FAQ

**Q: Is Google Apps Script free?**
Yes, 100% free. No limits for this use case.

**Q: Can I add more email recipients?**
Yes! In `google-apps-script.js`, change the `to:` field:
```js
to: 'hello@aionetech.in, your.personal@gmail.com'
```

**Q: Can I add more fields to the form?**
Yes — just add the HTML input field and update both `index.html` and `google-apps-script.js`.

**Q: What if Google is down?**
WhatsApp fallback kicks in automatically. You never miss a lead.

