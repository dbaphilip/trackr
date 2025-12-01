import prisma from "@/prisma/client";
import Link from "next/link";
import IssueStatusBadge from "./IssueStatusBadge";
import delay from "delay";
import IssueActions from "./IssueActions";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();
  await delay(3000);

  return (
    <div className="mt-5 container">
      <IssueActions />

      <div className="mt-5 row">
        {issues.map((issue) => (
          <div key={issue.id} className="mb-5 col-md-3">
            <div className="issue-card shadow-secondary">
              <div className="d-flex">
                <h2 className="fs-2">{issue.title.slice(0, 31)}...</h2>

                <div className="fs-4 d-flex justify-content-between">
                  <span>{issue.createdAt.toLocaleDateString()}</span>

                  <span>
                    <IssueStatusBadge status={issue.status} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* END row */}
    </div>
  );
}
