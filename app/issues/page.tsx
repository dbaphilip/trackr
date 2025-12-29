import { FaArrowUp } from "react-icons/fa";
import prisma from "@/prisma/client";
import delay from "delay";
import Link from "next/link";
import { Issue } from "../generated/prisma/client";
import { Status } from "../generated/prisma/enums";
import IssueStatusBadge from "./IssueStatusBadge";
import IssueStatusFilter from "./IssueStatusFilter";

export default async function IssuesPage(context: {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}) {
  //
  const columns: { label: string; value: keyof Issue }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt" },
  ];

  const { status, orderBy } = await context.searchParams;

  const statuses = Object.values(Status);

  const validStatus = statuses.includes(status) ? status : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: validStatus },
  });
  await delay(3000);

  return (
    <div className="mt-5 container">
      {/* IssueActions */}

      <div className="row">
        {/* IssueStatusFilter */}
        <div className="col-md-3">
          <IssueStatusFilter />
        </div>

        {/* OrderBy */}
        <div className="col-md-6">
          <table className="table">
            <thead className="fs-2">
              <tr>
                {columns.map((col) => (
                  <td key={col.label}>
                    <Link
                      href={{
                        query: { status, orderBy: col.value },
                      }}
                    >
                      {col.label}
                      {orderBy == col.value && (
                        <span className="ps-1">
                          <FaArrowUp />
                        </span>
                      )}
                    </Link>
                  </td>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        {/* New Issue Button */}
        <div className="col-md-3">
          <div className="d-flex justify-content-end">
            <Link
              href="/issues/new"
              className="fs-2 shadow-primary btn btn-primary"
            >
              New issue
            </Link>
          </div>
        </div>
      </div>

      {/* END IssueActions */}

      <div className="mt-5 row">
        {issues.map((issue) => (
          <div key={issue.id} className="mb-5 col-md-3">
            <div className="issue-card shadow-secondary">
              <div className="d-flex">
                <h2 className="fs-2">
                  <Link href={`/issues/${issue.id}`}>
                    {truncateTitle(issue.title)}
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
    </div>
  );
}

export const dynamic = "force-dynamic";

function truncateTitle(title: string) {
  return title.length > 33 ? `${title.slice(0, 33)}...` : title;
}
