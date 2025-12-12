import prisma from "@/prisma/client";
import delay from "delay";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";

export default async function IssueDetailsPage(context: {
  params: Promise<{ id: string }>;
}) {
  //
  const { id } = await context.params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  await delay(3000);

  if (!issue) notFound();

  return <IssueDetails issue={issue} />;
}
