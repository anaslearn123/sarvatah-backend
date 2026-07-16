import {
  Router,
  type IRouter,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { db, contactsTable, enrollmentsTable, newsletterTable } from "../db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

// Basic auth middleware guarding the admin dashboard's read-only endpoints.
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Basic ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString(
      "utf8",
    );
    const [user, pass] = decoded.split(":");
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminPassword && user === "admin" && pass === adminPassword) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

router.get(
  "/admin/contacts",
  requireAdmin,
  async (_req, res): Promise<void> => {
    const rows = await db
      .select()
      .from(contactsTable)
      .orderBy(desc(contactsTable.createdAt));
    res.json(rows);
  },
);

router.get(
  "/admin/enrollments",
  requireAdmin,
  async (_req, res): Promise<void> => {
    const rows = await db
      .select()
      .from(enrollmentsTable)
      .orderBy(desc(enrollmentsTable.createdAt));
    res.json(rows);
  },
);

router.get(
  "/admin/newsletter",
  requireAdmin,
  async (_req, res): Promise<void> => {
    const rows = await db
      .select()
      .from(newsletterTable)
      .orderBy(desc(newsletterTable.createdAt));
    res.json(rows);
  },
);

export default router;
