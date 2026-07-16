import { Router, type IRouter } from "express";
import { db, enrollmentsTable } from "../db";
import { CreateEnrollmentBody, CreateEnrollmentResponse } from "../api-zod";

const router: IRouter = Router();

// Save enrollment (called after successful payment or direct enrollment)
router.post("/enrollment", async (req, res): Promise<void> => {
  const parsed = CreateEnrollmentBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid enrollment body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { amount, paymentStatus, ...rest } = parsed.data;
  const [enrollment] = await db
    .insert(enrollmentsTable)
    .values({
      ...rest,
      amount: String(amount),
      paymentStatus: paymentStatus || "pending",
    })
    .returning();

  res.status(201).json(CreateEnrollmentResponse.parse(enrollment));
});

export default router;
