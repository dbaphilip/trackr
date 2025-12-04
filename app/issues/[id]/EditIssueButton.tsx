import Link from "next/link";

interface Props {
  issueId: number;
}

export default function EditIssueButton({ issueId }: Props) {
  //
  return (
    <Link
      className="fs-2 shadow-primary btn btn-primary"
      href={`/issues/${issueId}/edit`}
    >
      Edit issue
    </Link>
  );
}
