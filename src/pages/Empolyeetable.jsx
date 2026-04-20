import { useEffect, useState } from "react";
import { useGetAllEmployees } from "../hook/empoleeyhook.jsx";
import AddEmployeeModal from "../components/AddEmployeeModal.jsx";
import { toast } from "react-toastify";
import Topbar from "../components/Topbar.jsx";
const Empolyeetable = () => {
  const { employees, loading, error, employeesData } = useGetAllEmployees();
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (employees && employees.length > 0) {
      if (
        typeof window.$ !== "undefined" &&
        typeof window.$.fn.DataTable !== "undefined"
      ) {
        const table = window.$("#datatable");
        if (table.length > 0) {
          if (window.$.fn.DataTable.isDataTable("#datatable")) {
            table.DataTable().destroy();
          }

          setTimeout(() => {
            table.DataTable({
              responsive: true,
              pageLength: 10,
              order: [[0, "asc"]],
            });
          }, 100);
        }
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

  const handleModalClose = () => {
    setShowModal(false);
    setEditingEmployee(null);
  };

  const handleEmployeeAdded = () => {
    employeesData();
    setShowModal(false);
    setEditingEmployee(null);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = async (employeeId, employeeName) => {
    if (window.confirm(`Are you sure you want to delete ${employeeName}?`)) {
      try {
        setDeleting(employeeId);
        const response = await fetch(`/api/employees/${employeeId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Employee deleted successfully!");
          employeesData();
        } else {
          toast.error("Failed to delete employee");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Error deleting employee");
      } finally {
        setDeleting(null);
      }
    }
  };

  return (
    <>
      <Topbar />
      <AddEmployeeModal
        show={showModal}
        onClose={handleModalClose}
        onEmployeeAdded={handleEmployeeAdded}
        editingEmployee={editingEmployee}
      />

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h4 className="card-title mb-0">Employee Directory</h4>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setEditingEmployee(null);
                  setShowModal(true);
                }}
              >
                <i className="mdi mdi-plus-circle-outline"></i> Add Employee
              </button>
            </div>

            <div className="card-body">
              {loading && (
                <div className="alert alert-info mb-0">
                  <strong>Loading...</strong> Fetching employee data from
                  database
                </div>
              )}

              {error && (
                <div className="alert alert-danger mb-0">
                  <strong>Error:</strong> {error}
                </div>
              )}

              {!loading && employees && employees.length === 0 && (
                <div className="alert alert-warning mb-0">
                  <strong>No Data:</strong> No employees found in the database
                </div>
              )}

              {!loading && employees && employees.length > 0 && (
                <div className="table-responsive">
                  <table
                    id="datatable"
                    className="table table-hover table-bordered table-striped dt-responsive"
                    style={{
                      width: "100%",
                    }}
                  >
                    <thead className="bg-light">
                      <tr>
                        <th style={{ minWidth: "120px" }}>Name</th>
                        <th style={{ minWidth: "150px" }}>Email</th>
                        <th style={{ minWidth: "100px" }}>Phone</th>
                        <th style={{ minWidth: "100px" }}>CNIC</th>
                        <th style={{ minWidth: "80px" }}>Gender</th>
                        <th style={{ minWidth: "100px" }}>DOB</th>
                        <th style={{ minWidth: "100px" }}>Start Date</th>
                        <th style={{ minWidth: "90px" }}>Salary</th>
                        <th style={{ minWidth: "90px" }}>Department</th>
                        <th style={{ minWidth: "90px" }}>Designation</th>
                        <th style={{ minWidth: "80px" }}>Shift</th>
                        <th style={{ minWidth: "70px" }}>Status</th>
                        <th style={{ minWidth: "100px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee._id}>
                          <td>
                            <strong>{getFullName(employee)}</strong>
                          </td>
                          <td>
                            <small>{employee.email || "-"}</small>
                          </td>
                          <td>{employee.phone || "-"}</td>
                          <td>{employee.CNIC || "-"}</td>
                          <td>
                            <span className="badge bg-secondary">
                              {employee.gender || "-"}
                            </span>
                          </td>
                          <td>
                            <small>{formatDate(employee.dateOfBirth)}</small>
                          </td>
                          <td>
                            <small>{formatDate(employee.dateOfJoining)}</small>
                          </td>
                          <td>
                            <strong>
                              {employee.salary
                                ? `Rs. ${employee.salary.toLocaleString()}`
                                : "-"}
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
                          <td>
                            <div className="d-flex gap-2 flex-wrap">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => handleEdit(employee)}
                                title="Edit Employee"
                              >
                                <i className="mdi mdi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleDelete(
                                    employee._id,
                                    getFullName(employee),
                                  )
                                }
                                disabled={deleting === employee._id}
                                title="Delete Employee"
                              >
                                {deleting === employee._id ? (
                                  <span>
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  </span>
                                ) : (
                                  <i className="mdi mdi-delete"></i>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Empolyeetable;
