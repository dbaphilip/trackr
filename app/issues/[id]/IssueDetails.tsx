"use client";

import { Issue } from "@/app/generated/prisma/client";
import IssueDetailsTitle from "./IssueDetailsTitle";
import EditIssueButton from "./EditIssueButton";
import IssueDetailsDescription from "./IssueDetailsDescription";
import DeleteIssueButton from "./DeleteIssueButton";
import DeleteIssueErrorAlert from "./DeleteIssueErrorAlert";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface Props {
  issue: Issue;
}

export default function IssueDetails({ issue }: Props) {
  //
  const { status } = useSession();
  //
  const [deleteError, setDeleteError] = useState(false);
  //
  return (
    <div className="mt-5 container">
      <div className="row">
        <div className="col-md-6">
          <IssueDetailsTitle issue={issue} />

          {status == "authenticated" && (
            <div className="row">
              <div className="col">
                <div className="mt-5 d-flex justify-content-end">
                  <EditIssueButton issueId={issue.id} />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* col */}

        <div className="col-md-6">
          <div className="shadow-secondary">
            <IssueDetailsDescription issue={issue} />
          </div>

          {status == "authenticated" && (
            <DeleteIssueButton
              issueId={issue.id}
              onDeleteError={(hasError) => setDeleteError(hasError)}
            />
          )}

          <div className="row mt-5">
            <div className="col-12">
              {deleteError && <DeleteIssueErrorAlert />}
            </div>
          </div>
        </div>
        {/* col */}
      </div>
      {/* row */}
    </div>
  );
}
