import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

export async function saveToGoogleSheet(data: {
  fullName: string;
  email: string;
  phone?: string;
  interestedCourse?: string;
  message?: string;
}) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          data.fullName,
          data.email,
          data.phone || "",
          data.interestedCourse || "",
          data.message || "",
          new Date().toISOString(),
        ],
      ],
    },
  });
}