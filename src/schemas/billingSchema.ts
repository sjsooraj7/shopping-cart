import { z } from "zod";

export const billingSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),

  email: z.string().trim().email("Enter a valid email address"),

  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number is required and it must be numbers"),

  address: z.string().trim().min(1, "Address is required"),

  city: z.string().trim().min(1, "City is required"),

  postalCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Postal code is required and it must be 6 digit numbers"),
});

export type BillingFormData = z.infer<typeof billingSchema>;
