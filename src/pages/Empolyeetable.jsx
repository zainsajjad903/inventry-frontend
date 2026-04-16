import { useEffect } from "react";
import { getAllEmployees } from "../hook/empoleeyhook";

const Empolyeetable = () => {
  const { employees, loading, error } = getAllEmployees();

  useEffect(() => {
    // Initialize DataTable after data loads
    if (employees && employees.length > 0 && window.$) {
      const table = $("#datatable");
      if (table.DataTable) {
        // Destroy existing DataTable if it exists
        if ($.fn.DataTable.isDataTable("#datatable")) {
          $("#datatable").DataTable().destroy();
        }
        // Reinitialize DataTable with new data
        setTimeout(() => {
          table.DataTable({
            responsive: true,
            pageLength: 10,
          });
        }, 100);
      }
    }
  }, [employees]);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-PK");
  };

  const getFullName = (employee) => {
    return `${employee.firstName || ""} ${employee.lastName || ""}`.trim();
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Employee Directory</h4>
            </div>
            <div className="card-body">
              {loading && (
                <div className="alert alert-info">
                  <strong>Loading...</strong> Fetching employee data from
                  database
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  <strong>Error:</strong> {error}
                </div>
              )}

              {!loading && employees && employees.length === 0 && (
                <div className="alert alert-warning">
                  <strong>No Data:</strong> No employees found in the database
                </div>
              )}

              {!loading && employees && employees.length > 0 && (
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
                      <th style={{ minWidth: "120px" }}>Name</th>
                      <th style={{ minWidth: "150px" }}>Email</th>
                      <th style={{ minWidth: "100px" }}>Phone</th>
                      <th style={{ minWidth: "100px" }}>CNIC</th>
                      <th style={{ minWidth: "100px" }}>Gender</th>
                      <th style={{ minWidth: "120px" }}>Date of Birth</th>
                      <th style={{ minWidth: "120px" }}>Start Date</th>
                      <th style={{ minWidth: "100px" }}>Salary</th>
                      <th style={{ minWidth: "100px" }}>Department</th>
                      <th style={{ minWidth: "100px" }}>Designation</th>
                      <th style={{ minWidth: "100px" }}>Shift</th>
                      <th style={{ minWidth: "80px" }}>Status</th>
                      <th style={{ minWidth: "120px" }}>Created</th>
                      <th style={{ minWidth: "120px" }}>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee._id}>
                        <td>
                          <strong>{getFullName(employee)}</strong>
                        </td>
                        <td>{employee.email || "-"}</td>
                        <td>{employee.phone || "-"}</td>
                        <td>{employee.CNIC || "-"}</td>
                        <td>
                          <span className="badge bg-secondary">
                            {employee.gender || "-"}
                          </span>
                        </td>
                        <td>{formatDate(employee.dateOfBirth)}</td>
                        <td>{formatDate(employee.dateOfJoining)}</td>
                        <td>
                          <strong>
                            Rs. {employee.salary?.toLocaleString() || "-"}
                          </strong>
                        </td>
                        <td>
                          {employee.department?._id ? (
                            <span className="badge bg-info">
                              {employee.department?.name || "Dept"}
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          {employee.designation?._id ? (
                            <span className="badge bg-primary">
                              {employee.designation?.title || "Position"}
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          {employee.shift?._id ? (
                            <span className="badge bg-warning text-dark">
                              {employee.shift?.name || "Shift"}
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              employee.status === "Active"
                                ? "bg-success"
                                : employee.status === "Inactive"
                                  ? "bg-secondary"
                                  : employee.status === "Terminated"
                                    ? "bg-danger"
                                    : "bg-warning text-dark"
                            }`}
                          >
                            {employee.status || "-"}
                          </span>
                        </td>
                        <td>{formatDate(employee.createdAt)}</td>
                        <td>{formatDate(employee.updatedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Empolyeetable;
