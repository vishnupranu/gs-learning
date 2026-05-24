import { google } from 'googleapis';

/**
 * Utility to append rows to a Google Sheet
 * Requires GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY env vars
 * along with the SPREADSHEET_ID.
 */
export async function appendToGoogleSheet(
  spreadsheetId: string,
  range: string,
  values: string[][]
) {
  try {
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.warn('Google Sheets API credentials missing. Skipping sheet sync.');
      return false;
    }

    // Format the private key which might have escaped newlines from env vars
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error('Google Sheets API Error:', error);
    return false;
  }
}
