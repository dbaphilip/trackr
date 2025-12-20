import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  //
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

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

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  //
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const { id } = await context.params;

  await delay(3000);
  const issue = prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) return NextResponse.json("issue not found", { status: 404 });

  await prisma.issue.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({});
}
