import { Status } from "@/app/generated/prisma/enums";

interface Props {
  status: Status;
}

const statusMap: Record<
  "OPEN" | "IN_PROGRESS" | "CLOSED",
  { label: string; skin: "success" | "danger" | "warning" }
> = {
  //
  OPEN: { label: "Open", skin: "danger" },

  IN_PROGRESS: { label: "In progress", skin: "warning" },

  CLOSED: { label: "Closed", skin: "success" },
};

export default function IssueStatusBadge({ status }: Props) {
  //
  return (
    <span className={`badge text-bg-${statusMap[status].skin}`}>
      {statusMap[status].label}
    </span>
  );
}
