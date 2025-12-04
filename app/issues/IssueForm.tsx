"use client";

import { issueSchema } from "@/app/validationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import z from "zod";
import { Issue } from "../generated/prisma/client";

type saveIssueType = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

export default function IssueForm({ issue }: Props) {
  //
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(issueSchema),
  });

  const on_submit = async (data: saveIssueType) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.put(`/api/issues/${issue.id}`, data);
        router.push(`/issues/${issue.id}`);
      } else {
        await axios.post("/api/issues", data);
        router.push("/issues");
        router.refresh();
      }
    } catch (e) {
      setError("Oops. Something went wrong.");
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-5 container">
      <div className="row">
        <div className="col-md-7">
          <div className="mb-3">
            {error ? (
              <h1 className="text-danger">{error}</h1>
            ) : (
              <h1>{issue ? "Edit issue" : "New issue"}</h1>
            )}
          </div>

          <form onSubmit={handleSubmit(on_submit)}>
            <div className="mb-3">
              <input
                {...register("title")}
                placeholder="title"
                defaultValue={issue?.title}
                className="fs-2 shadow-primary form-control"
              />

              <ErrorMessage>{errors.title?.message}</ErrorMessage>
            </div>

            <div className="mb-3">
              <textarea
                {...register("description")}
                placeholder="description"
                defaultValue={issue?.description}
                rows={5}
                className="fs-2 shadow-primary form-control"
              />

              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="fs-2 shadow-primary btn btn-primary"
            >
              <span className="d-flex align-items-center">
                {issue ? "Update issue" : "Submit issue"}
                {isSubmitting && <Spinner />}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
