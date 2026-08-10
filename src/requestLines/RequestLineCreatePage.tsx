import RequestLinesForm from "./RequestLineForm";

function RequestLinesCreatePage() {
  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-5 border-bottom border-2">
        <h2>New Request Line</h2>
      </div>
      <RequestLinesForm />
    </section>
  );
}

export default RequestLinesCreatePage;
