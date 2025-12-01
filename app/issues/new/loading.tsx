export default function LoadingNewIssuePage() {
  return (
    <div className="mt-5 container">
      <div className="row">
        <div className="col-md-7">
          <div className="mb-3">
            <h1>New issue</h1>
          </div>

          <form>
            <div className="mb-3">
              <input
                placeholder="title"
                className="fs-2 shadow-primary form-control"
              />
            </div>

            <div className="mb-3">
              <textarea
                placeholder="description"
                rows={5}
                className="fs-2 shadow-primary form-control"
              />
            </div>

            <button
              type="submit"
              disabled
              className="fs-2 shadow-primary btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
