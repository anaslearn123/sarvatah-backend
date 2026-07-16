import { GoogleAuth } from "google-auth-library";

const auth = new GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

export async function saveToGoogleSheet(data: {
  fullName: string;
  email: string;
  phone?: string;
  interestedCourse?: string;
  message?: string;
}) {
  const client = await auth.getClient();

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  await client.request({
    url: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:F:append`,
    method: "POST",
    params: {
      valueInputOption: "USER_ENTERED",
    },
    data: {
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