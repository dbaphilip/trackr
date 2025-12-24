import { Issue, User } from "@/app/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
}

export default function AssigneeSelector({ issue }: Props) {
  //
  const [assignedUser, setAssignedUser] = useState(issue.userId || "");

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 10 * 60 * 1000, // 10 mins
    retry: 3,
  });

  const assignIssueToUser = (userId: string) => {
    axios
      .put(`/api/issues/${issue.id}`, {
        userId: userId || null,
      })
      .catch(() => {
        toast.error("Oops! Something went wrong.");
      });
  };

  if (error || isLoading) return null;

  return (
    <>
      <select
        value={assignedUser}
        onChange={(e) => {
          assignIssueToUser(e.target.value);
          setAssignedUser(e.target.value);
        }}
        className="form-select fs-2 shadow-primary"
      >
        <option value="">Assign to...</option>
        <option value="">No one</option>
        {users?.map((user: User) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <Toaster
        toastOptions={{
          className: "fs-1 text-danger",
        }}
      />
    </>
  );
}
