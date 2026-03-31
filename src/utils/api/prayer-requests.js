import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = 'PrayerRequests';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, request } = req.body;

    // Validate required fields
    if (!name || !phone || !request) {
      return res.status(400).json({ 
        error: 'All fields are required',
        received: { name: !!name, phone: !!phone, request: !!request }
      });
    }

    // Prepare the data
    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'Asia/Manila'
    });
    
    const values = [[
      timestamp,
      name,
      phone,
      request,
      'New',
      ''
    ]];

    // Append to Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:F`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    // Always return a JSON response
    return res.status(200).json({ 
      success: true, 
      message: 'Prayer request submitted successfully',
      data: {
        timestamp,
        name,
        phone,
        request
      }
    });

  } catch (error) {
    console.error('Google Sheets API Error:', error);
    
    // Return detailed error information
    return res.status(500).json({ 
      error: 'Failed to submit prayer request',
      details: error.message,
      // Don't expose sensitive info in production
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
}