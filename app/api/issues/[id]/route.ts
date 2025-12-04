import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  //
  const { id } = await context.params;
  const body = await req.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) return NextResponse.json("Issue not found", { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue);
}
