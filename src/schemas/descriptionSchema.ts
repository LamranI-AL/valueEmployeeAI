import { z } from "zod";

export const descriptionSchema = z.object({
  id: z.string().optional(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(100, { message: "Description must be less than 100 characters" }),
});
