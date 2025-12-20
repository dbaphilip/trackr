export default function SearchForm() {
  return (
    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
      <input
        type="search"
        className="fs-2 shadow-primary form-control"
        placeholder="Search..."
        aria-label="Search"
      />
    </form>
  );
}
