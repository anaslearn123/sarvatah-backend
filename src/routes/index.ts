import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import newsletterRouter from "./newsletter";
import enrollmentRouter from "./enrollment";
import pageVisitRouter from "./pageVisit";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(newsletterRouter);
router.use(enrollmentRouter);
router.use(pageVisitRouter);
router.use(adminRouter);

export default router;
