import { Issue } from "@/app/generated/prisma/client";

interface Props {
  issue: Issue;
}

export default function IssueDetailsDescription({ issue }: Props) {
  //
  return (
    <div
      className="p-2 fs-2 brico lh-1 issue-description"
      dangerouslySetInnerHTML={{ __html: issue.description }}
    ></div>
  );
}
