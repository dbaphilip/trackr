import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueStatusBadge from "../IssueStatusBadge";
import delay from "delay";

interface Props {
  params: { id: string };
}

export default async function IssueDetailsPage({ params }: Props) {
  //
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  await delay(3000);

  if (!issue) notFound();

  return (
    <div className="mt-5 container">
      <div className="row">
        <div className="col-md-6">
          <h1 style={{ fontSize: "4rem" }}> {issue.title} </h1>

          <div className="d-flex justify-content-between">
            <span className="fs-3">
              <IssueStatusBadge status={issue.status} />
            </span>

            <span className="fs-2">{issue.createdAt.toLocaleDateString()}</span>
          </div>
        </div>
        {/* col */}

        <div className="col-md-6">
          <div className="shadow-secondary">
            <div
              className="p-2 fs-2"
              dangerouslySetInnerHTML={{ __html: issue.description }}
            ></div>
          </div>
        </div>
        {/* col */}
      </div>
      {/* row */}
    </div>
  );
}
