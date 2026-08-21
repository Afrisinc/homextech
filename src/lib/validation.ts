import { z } from "zod";

const requiredText = (label: string, min = 2, max = 160) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(min, `${label} must be at least ${min} characters`)
    .max(max, `${label} must be under ${max} characters`);

const optionalText = (max = 160) =>
  z.string().trim().max(max).optional().or(z.literal(""));

export const inquirySchema = z.object({
  fullName: requiredText("Full name"),
  organization: optionalText(),
  email: z.email("Enter a valid email address").max(200),
  phone: optionalText(40),
  country: optionalText(80),
  service: requiredText("Service", 2, 80),
  projectType: optionalText(80),
  message: requiredText("Message", 10, 4000),
  /** Honeypot — must stay empty. */
  website: z.string().max(200).optional(),
});

export const consultationSchema = z.object({
  organization: requiredText("Organization"),
  contactName: requiredText("Contact name"),
  email: z.email("Enter a valid email address").max(200),
  phone: optionalText(40),
  infrastructureType: requiredText("Infrastructure type", 2, 120),
  challenges: requiredText("Current challenges", 10, 4000),
  userCount: requiredText("Estimated users", 1, 40),
  hasServers: requiredText("Server infrastructure", 1, 60),
  hasNetworking: requiredText("Network infrastructure", 1, 60),
  cloudRequirement: requiredText("Cloud requirement", 1, 60),
  trainingRequirement: requiredText("Training requirement", 1, 60),
  website: z.string().max(200).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type ConsultationInput = z.infer<typeof consultationSchema>;

/** Collapse a ZodError into a simple field -> messages map for form UIs. */
export function toFieldErrors(error: z.ZodError): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    out[key] = [...(out[key] ?? []), issue.message];
  }
  return out;
}

/** Basic hardening for values that will be stored or emailed. */
export function sanitize(value: string) {
  // Strip ASCII control characters, then trim.
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
}
