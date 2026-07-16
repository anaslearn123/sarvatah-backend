import { Router, type IRouter } from "express";
import { db, pageVisitsTable } from "../db";
import { RecordPageVisitBody } from "../api-zod";

const router: IRouter = Router();

// Fire-and-forget analytics — always responds 200 even if validation/insert fails.
router.post("/page-visit", async (req, res): Promise<void> => {
  const parsed = RecordPageVisitBody.safeParse(req.body);
  if (parsed.success) {
    try {
      await db.insert(pageVisitsTable).values(parsed.data);
    } catch (err) {
      req.log.error(err, "page visit insert failed");
    }
  }
  res.json({ ok: true });
});

export default router;
