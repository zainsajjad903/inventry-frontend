const Empolyeetable = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Basic datatable</h4>
            </div>
            <div className="card-body">
              <p className="text-muted">
                <strong>Datatables</strong> has most features enabled by
                default, so all you need to do to use it with your own tables is
                to call the construction function: <code>$().DataTable()</code>.
                Searching, ordering and paging goodness will be immediately
                added to the table, as shown in this example.
              </p>

              <table
                id="datatable"
                className="table table-hover table-bordered table-striped dt-responsive nowrap"
                style={{
                  borderCollapse: "collapse",
                  borderSpacing: 0,
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Empolyeetable;
