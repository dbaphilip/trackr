import { useState } from "react";
import DeleteIssueModal from "./DeleteIssueModal";
import Spinner from "../Spinner";

interface Props {
  issueId: number;
  onDeleteError: (hasError: boolean) => void;
}

export default function DeleteIssueButton({ issueId, onDeleteError }: Props) {
  //
  const [isDeleting, setDeleting] = useState(false);
  //
  return (
    <>
      <div className="mt-5 d-flex justify-content-end">
        <button
          disabled={isDeleting}
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          className="fs-2 shadow-primary btn btn-danger"
        >
          <span className="d-flex align-items-center">
            {!isDeleting && "Delete issue"}
            {isDeleting && "Deleting..."}
            {isDeleting && <Spinner />}
          </span>
        </button>
      </div>

      {/* Modal */}
      <DeleteIssueModal
        isDeleting={(yes) => setDeleting(yes)}
        onDeleteError={(hasError) => onDeleteError(hasError)}
        id={issueId}
      />
    </>
  );
}
