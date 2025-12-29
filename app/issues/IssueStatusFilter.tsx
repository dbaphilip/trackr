"use client";

import { useRouter } from "next/navigation";
import { Status } from "../generated/prisma/enums";

export default function IssueStatusFilter() {
  const statuses: { label: string; status?: Status }[] = [
    { label: "All" },
    { label: "Open", status: "OPEN" },
    { label: "In Progress", status: "IN_PROGRESS" },
    { label: "Closed", status: "CLOSED" },
  ];

  const router = useRouter();
  //
  return (
    <select
      onChange={(e) => {
        const query = e.target.value ? `?status=${e.target.value}` : "";

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
