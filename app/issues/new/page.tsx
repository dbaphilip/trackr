"use client";

import { createIssueSchema } from "@/app/validationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import z from "zod";

type createIssueType = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createIssueSchema),
  });

  const on_submit = async (data: createIssueType) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
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
              <h1>New issue</h1>
            )}
          </div>

          <form onSubmit={handleSubmit(on_submit)}>
            <div className="mb-3">
              <input
                {...register("title")}
                placeholder="title"
                className="fs-2 shadow-primary form-control"
              />

              <ErrorMessage>{errors.title?.message}</ErrorMessage>
            </div>

            <div className="mb-3">
              <textarea
                {...register("description")}
                placeholder="description"
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
                Submit {isSubmitting && <Spinner />}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
