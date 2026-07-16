import { Router, type IRouter } from "express";
import { db, contactsTable } from "../db";
import { SubmitContactBody, SubmitContactResponse } from "../api-zod";
import { saveToGoogleSheet } from "../lib/googleSheets";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);

  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [contact] = await db
    .insert(contactsTable)
    .values(parsed.data)
    .returning();

  // Save lead to Google Sheet
  try {
    await saveToGoogleSheet({
      fullName: contact.fullName,
      email: contact.email,
      phone: contact.phone || "",
      interestedCourse: contact.interestedCourse || "",
      message: contact.message || "",
    });

    console.log("GOOGLE SHEET: Data saved successfully");
  } catch (error) {
    console.log("GOOGLE SHEET ERROR:", error);
  }

  res.status(201).json(SubmitContactResponse.parse(contact));
});

export default router;