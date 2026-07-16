// Standalone request/response validation schemas.
// Mirrors backend/lib/api-spec/openapi.yaml from the original project
// (previously generated into a separate @workspace/api-zod package).
import { z } from "zod/v4";

export const HealthCheckResponse = z.object({
  status: z.string(),
});

export const ErrorResponse = z.object({
  error: z.string(),
});

export const OkResponse = z.object({
  ok: z.boolean(),
});

// ---- Contact ----
export const SubmitContactBody = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  interestedCourse: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
});

export const SubmitContactResponse = z.object({
  id: z.number().int(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string().nullable().optional(),
  interestedCourse: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  createdAt: z.union([z.string(), z.date()]),
});

// ---- Newsletter ----
export const SubscribeNewsletterBody = z.object({
  email: z.string().email(),
});

export const SubscribeNewsletterResponse = z.object({
  id: z.number().int(),
  email: z.string(),
  createdAt: z.union([z.string(), z.date()]),
});

// ---- Enrollment ----
export const CreateEnrollmentBody = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  courseName: z.string().min(1),
  planType: z.string().min(1),
  amount: z.number(),
  paymentStatus: z.string().nullable().optional(),
  razorpayOrderId: z.string().nullable().optional(),
  razorpayPaymentId: z.string().nullable().optional(),
});

export const CreateEnrollmentResponse = z.object({
  id: z.number().int(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  courseName: z.string(),
  planType: z.string(),
  amount: z.union([z.string(), z.number()]),
  paymentStatus: z.string(),
  razorpayOrderId: z.string().nullable().optional(),
  razorpayPaymentId: z.string().nullable().optional(),
  createdAt: z.union([z.string(), z.date()]),
});

// ---- Page visit (analytics) ----
export const RecordPageVisitBody = z.object({
  page: z.string().min(1),
  referrer: z.string().nullable().optional(),
});
