import z from "zod";

export const issueSchema = z.object({
  title: z.string().min(3, "title is too short").max(255, "title is too long"),

  description: z.string().min(5, "description is too short"),
});


export const updateIssueSchema = z.object({
  title: z.string().min(3, "title is too short").max(255, "title is too long").optional(),

  description: z.string().min(5, "description is too short").max(3_000, "description is too long").optional(),

  userId: z.string().min(1).optional().nullable(),
});
