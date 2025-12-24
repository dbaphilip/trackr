import { Issue } from "@/app/generated/prisma/client";
import IssueStatusBadge from "../IssueStatusBadge";

interface Props {
  issue: Issue;
}

export default function IssueDetailsTitle({ issue }: Props) {
  //
  return (
    <>
      <h1 style={{ fontSize: "4rem" }}> {issue.title} </h1>

      <div className="d-flex justify-content-between">
        <span className="fs-3">
          <IssueStatusBadge status={issue.status} />
        </span>

        <span className="fs-2">{issue.createdAt.toLocaleDateString()}</span>
      </div>

      {/* {issue.userId && <div className="mt-5 mb-2">{issue.userId}</div>} */}
    </>
  );
}
