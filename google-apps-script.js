// ============================================================
// AIONETECH LEAD CAPTURE — Google Apps Script
// ============================================================
//
// PASTE THIS CODE IN: Google Sheet → Extensions → Apps Script
//
// DEPLOY STEPS:
//   1. Click Deploy → New deployment
//   2. Click ⚙️ gear → "Web app"
//   3. Execute as: "Me"
//   4. Who has access: "Anyone" ← IMPORTANT!
//   5. Click Deploy → Authorize → Allow
//   6. Copy the URL → paste in index.html
//
// ⚠️ IMPORTANT: You MUST select "Anyone" not "Only myself"
// ⚠️ If you see "Access denied" — redeploy with "Anyone"
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date', 'Name', 'Email', 'Phone', 'Clinic', 'Message', 'Status']);
    }

    // Save the lead
    sheet.appendRow([
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.clinic || '',
      data.message || '',
      'New Lead ✨'
    ]);

    // Send email notification
    MailApp.sendEmail({
      to: 'hello@aionetech.in',
      subject: '🏥 New Lead: ' + (data.name || 'Unknown'),
      htmlBody: '<h2>New Lead from AioneTech Website</h2>' +
        '<table style="border-collapse:collapse;">' +
        '<tr><td style="padding:8px;font-weight:bold;">Name:</td><td style="padding:8px;">' + (data.name || '') + '</td></tr>' +
        '<tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">' + (data.email || '') + '</td></tr>' +
        '<tr><td style="padding:8px;font-weight:bold;">Phone:</td><td style="padding:8px;">' + (data.phone || '') + '</td></tr>' +
        '<tr><td style="padding:8px;font-weight:bold;">Clinic:</td><td style="padding:8px;">' + (data.clinic || '') + '</td></tr>' +
        '<tr><td style="padding:8px;font-weight:bold;">Message:</td><td style="padding:8px;">' + (data.message || '') + '</td></tr>' +
        '</table>'
    });

    return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({success: true, message: 'AioneTech API is running!'})).setMimeType(ContentService.MimeType.JSON);
}

