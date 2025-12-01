import Link from "next/link";

export default function IssuesPage() {
  return (
    <div className="mt-5 container">
      <Link href="/issues/new" className="fs-2 shadow-primary btn btn-primary">
        New issue
      </Link>
    </div>
  );
}
