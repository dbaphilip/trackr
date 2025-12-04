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
                <h2 className="fs-2">
                  <Link href={`/issues/${issue.id}`}>
                    {issue.title.slice(0, 31)}...
                  </Link>
                </h2>

                <div className="fs-4 d-flex justify-content-between">
                  <Link href={`/issues/${issue.id}`}>
                    <span>{issue.createdAt.toLocaleDateString()}</span>
                  </Link>

                  <Link href={`/issues/${issue.id}`}>
                    <span>
                      <IssueStatusBadge status={issue.status} />
                    </span>
                  </Link>
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

export const dynamic = "force-dynamic";
