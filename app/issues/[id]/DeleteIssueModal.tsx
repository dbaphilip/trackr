"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  onDeleteError: (hasError: boolean) => void;
  isDeleting: (yes: boolean) => void;
}

export default function DeleteIssueModal({
  id,
  onDeleteError,
  isDeleting,
}: Props) {
  //
  const router = useRouter();
  //
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="fs-2 btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p className="fs-1">Are you sure???</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="fs-2 shadow-primary btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              className="fs-2 shadow-primary btn btn-danger"
              onClick={async () => {
                try {
                  isDeleting(true);
                  await axios.delete(`/api/issues/${id}`);

                  router.push("/issues");
                  router.refresh();
                } catch (e) {
                  onDeleteError(true);
                  isDeleting(false);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
