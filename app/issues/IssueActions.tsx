import Link from "next/link";

export default function IssueActions() {
  return (
    <>
      <Link href="/issues/new" className="fs-2 shadow-primary btn btn-primary">
        New issue
      </Link>
    </>
  );
}
