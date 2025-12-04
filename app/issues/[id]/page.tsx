import prisma from "@/prisma/client";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetailsDescription from "./IssueDetailsDescription";
import IssueDetailsTitle from "./IssueDetailsTitle";

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
          <IssueDetailsTitle issue={issue} />

          <div className="row">
            <div className="col">
              <div className="mt-5 d-flex justify-content-end">
                <EditIssueButton issueId={issue.id} />
              </div>
            </div>
          </div>
        </div>
        {/* col */}

        <div className="col-md-6">
          <div className="shadow-secondary">
            <IssueDetailsDescription issue={issue} />
          </div>
        </div>
        {/* col */}
      </div>
      {/* row */}
    </div>
  );
}
