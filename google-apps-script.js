// ============================================================
// AIONETECH LEAD CAPTURE — Google Apps Script
// ============================================================
// This script does 3 things when someone submits the contact form:
//   1. Saves the lead to a Google Sheet (your free CRM)
//   2. Sends you an email notification at hello@aionetech.in
//   3. Returns success to the website
//
// ============================================================
// HOW TO SET UP (one-time, 5 minutes):
// ============================================================
//
// STEP 1: Create a Google Sheet
//   - Go to https://sheets.google.com
//   - Create a new spreadsheet
//   - Name it "AioneTech Leads"
//   - In Row 1, add these headers:
//     A1: Date | B1: Name | C1: Email | D1: Phone | E1: Clinic | F1: Message | G1: Status
//
// STEP 2: Open Apps Script
//   - In the Google Sheet, click Extensions → Apps Script
//   - Delete everything in the editor
//   - Paste ALL the code below
//   - Click Save (💾)
//
// STEP 3: Deploy as Web App
//   - Click Deploy → New deployment
//   - Click the ⚙️ gear icon → Select "Web app"
//   - Set "Execute as" → Me
//   - Set "Who has access" → Anyone
//   - Click Deploy
//   - Click "Authorize access" → Choose your Google account → Allow
//   - COPY the Web App URL (looks like: https://script.google.com/macros/s/xxxxx/exec)
//
// STEP 4: Paste the URL in your index.html
//   - Find the line: const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL';
//   - Replace YOUR_GOOGLE_SCRIPT_URL with the URL you copied
//   - Push to GitHub → Vercel auto-deploys
//
// DONE! Every form submission will:
//   ✅ Save to your Google Sheet
//   ✅ Send you an email at hello@aionetech.in
//   ✅ Show success to the visitor
//
// ============================================================

// ===== MAIN FUNCTION — handles form submissions =====
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // 1. Save to Google Sheet
    saveToSheet(data);

    // 2. Send email notification
    sendEmailNotification(data);

    // 3. Return success
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Lead saved successfully!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== Handle GET requests (for testing) =====
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: 'AioneTech Lead API is running!' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===== SAVE TO GOOGLE SHEET =====
function saveToSheet(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add header row if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'Name', 'Email', 'Phone', 'Clinic', 'Message', 'Status']);
    // Bold the header
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
  }

  // Add the lead data
  sheet.appendRow([
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.clinic || 'Not provided',
    data.message || '',
    'New Lead ✨'
  ]);
}

// ===== SEND EMAIL NOTIFICATION =====
function sendEmailNotification(data) {
  var subject = '🏥 New Lead: ' + (data.name || 'Unknown') + ' — AioneTech';

  var htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px;border-radius:12px 12px 0 0;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:20px;">🏥 New Clinic Audit Request</h1>
      </div>
      <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:12px 8px;font-weight:bold;color:#4f46e5;width:100px;">Name</td>
            <td style="padding:12px 8px;">${data.name || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:12px 8px;font-weight:bold;color:#4f46e5;">Email</td>
            <td style="padding:12px 8px;"><a href="mailto:${data.email}">${data.email || 'Not provided'}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:12px 8px;font-weight:bold;color:#4f46e5;">Phone</td>
            <td style="padding:12px 8px;"><a href="https://wa.me/${(data.phone || '').replace(/[^0-9]/g,'')}">${data.phone || 'Not provided'}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:12px 8px;font-weight:bold;color:#4f46e5;">Clinic</td>
            <td style="padding:12px 8px;">${data.clinic || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding:12px 8px;font-weight:bold;color:#4f46e5;">Challenge</td>
            <td style="padding:12px 8px;">${data.message || 'Not provided'}</td>
          </tr>
        </table>
        <div style="margin-top:20px;text-align:center;">
          <a href="https://wa.me/${(data.phone || '').replace(/[^0-9]/g,'')}" style="display:inline-block;padding:12px 24px;background:#25d366;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;margin-right:8px;">💬 Reply on WhatsApp</a>
          <a href="mailto:${data.email}" style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">📧 Reply by Email</a>
        </div>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">AioneTech Lead Capture System — aionetech.in</p>
    </div>
  `;

  // Send to your email
  MailApp.sendEmail({
    to: 'hello@aionetech.in',
    subject: subject,
    htmlBody: htmlBody
  });
}

