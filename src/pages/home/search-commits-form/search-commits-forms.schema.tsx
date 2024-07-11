import { z } from "zod";

export const searchCommitsFormSchema = z
  .object({
    startDate: z
      .string()
      .min(1, {
        message: "Start date is required",
      })
      .refine((date) => new Date(date) <= new Date(), {
        message: "Start date cannot be in the future",
      }),
    endDate: z
      .string()
      .min(1, {
        message: "End date is required",
      })
      .refine((date) => new Date(date) <= new Date(), {
        message: "End date cannot be in the future",
      }),

    repo: z.string().min(1, { message: "Repository is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.startDate > data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date must be after start date",
      });
    }
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 30) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "The date range cannot be more than 30 days",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "The date range cannot be more than 30 days",
      });
    }
  });

export type SearchCommitsFormSchema = z.infer<typeof searchCommitsFormSchema>;
