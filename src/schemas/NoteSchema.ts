import { z } from "zod";

export const noteSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, { message: "Description is required" })
    .max(100, { message: "Description must be less than 100 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be more than 5 characters" })
    .max(100, { message: "Description must be less than 100 characters" }),
});
