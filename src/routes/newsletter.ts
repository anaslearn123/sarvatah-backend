import { Router, type IRouter } from "express";
import { db, newsletterTable } from "../db";
import {
  SubscribeNewsletterBody,
  SubscribeNewsletterResponse,
} from "../api-zod";

const router: IRouter = Router();

router.post("/newsletter", async (req, res): Promise<void> => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid newsletter body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [subscription] = await db
    .insert(newsletterTable)
    .values(parsed.data)
    .onConflictDoNothing()
    .returning();

  res
    .status(201)
    .json(
      SubscribeNewsletterResponse.parse(
        subscription ?? { id: 0, email: parsed.data.email, createdAt: new Date() },
      ),
    );
});

export default router;
