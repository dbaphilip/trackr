import IssueActions from "./IssueActions";

export default function LoadingIssuesPage() {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div className="mt-5 container">
      <IssueActions />

      <div className="mt-5 row">
        {issues.map((issue) => (
          <div key={issue} className="mb-5 col-md-3">
            <div className="issue-card shadow-secondary">
              <div className="d-flex"></div>
            </div>
          </div>
        ))}
      </div>
      {/* END row */}
    </div>
  );
}
