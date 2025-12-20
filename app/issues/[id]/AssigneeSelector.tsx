import { User } from "@/app/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AssigneeSelector() {
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

  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await axios.get("/api/users");
  //     setUsers(res.data);
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <select className="form-select fs-2 shadow-primary">
      <option>Assign to...</option>
      {users?.map((user: User) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
