import IssueStatusBadge from "../IssueStatusBadge";

export default async function IssueDetailsPage() {
  //

  return (
    <div className="mt-5 container">
      <div className="row">
        <div className="col-md-6">
          <h1 style={{ fontSize: "4rem" }}> Please wait... </h1>

          <div className="d-flex justify-content-between">
            <span className="fs-3">
              <IssueStatusBadge status="OPEN" />
            </span>

            <span className="fs-2">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        {/* col */}

        <div className="col-md-6">
          <div className="shadow-secondary">
            <div className="p-2 fs-2"> Please wait...</div>
          </div>
        </div>
        {/* col */}
      </div>
      {/* row */}
    </div>
  );
}
