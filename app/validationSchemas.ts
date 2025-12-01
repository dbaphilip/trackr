import z from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(3, "title is too short").max(255, "title is too long"),

  description: z.string().min(5, "description is too short"),
});
