"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Status } from "../generated/prisma/enums";

export default function IssueStatusFilter() {
  const statuses: { label: string; status?: Status }[] = [
    { label: "All" },
    { label: "Open", status: "OPEN" },
    { label: "In Progress", status: "IN_PROGRESS" },
    { label: "Closed", status: "CLOSED" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  //
  return (
    <select
      value={searchParams.get("status") || undefined}
      onChange={(e) => {
        const params = new URLSearchParams();

        if (e.target.value) params.append("status", e.target.value);

        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        const query = params.size ? `?${params.toString()}` : undefined;

        router.push(`/issues${query}`);
      }}
      className="form-select fs-2 shadow-primary"
      aria-label="Default select example"
    >
      <option>Filter by status</option>

      {statuses.map(({ status, label }) => (
        <option key={label} value={status || ""}>
          {label}
        </option>
      ))}
    </select>
  );
}
