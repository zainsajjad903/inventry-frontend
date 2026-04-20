import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
} from "../Api/Departmentapi.js";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getAllDepartments();
      if (result?.success === false) {
        throw new Error(result?.message || "Error fetching departments");
      }
      setDepartments(result?.data || []);
    } catch (err) {
      setError(err.message || "Error fetching departments");
      toast.error(err.message || "Error fetching departments");
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (
      departments.length > 0 &&
      typeof window.$ !== "undefined" &&
      typeof window.$.fn.DataTable !== "undefined"
    ) {
      const table = window.$("#department-datatable");
      if (table.length > 0) {
        if (window.$.fn.DataTable.isDataTable("#department-datatable")) {
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
  }, [departments]);

  const openAddModal = () => {
    setEditingDepartment(null);
    setName("");
    setShowModal(true);
  };

  const openEditModal = (department) => {
    setEditingDepartment(department);
    setName(department?.name || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDepartment(null);
    setName("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Department name is required");
      return;
    }

    try {
      setSaving(true);
      if (editingDepartment?._id) {
        const updateResult = await updateDepartment(editingDepartment._id, {
          name: name.trim(),
        });
        if (updateResult?.success === false) {
          throw new Error(
            updateResult?.message || "Failed to update department",
          );
        }
        toast.success("Department updated successfully");
      } else {
        const createResult = await createDepartment({ name: name.trim() });
        if (createResult?.success === false) {
          throw new Error(
            createResult?.message || "Failed to create department",
          );
        }
        toast.success("Department added successfully");
      }

      closeModal();
      fetchDepartments();
    } catch (err) {
      toast.error(err.message || "Failed to save department");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (department) => {
    if (!window.confirm(`Delete department ${department.name}?`)) {
      return;
    }

    try {
      setDeletingId(department._id);
      const deleteResult = await deleteDepartment(department._id);
      if (deleteResult?.success === false) {
        throw new Error(deleteResult?.message || "Failed to delete department");
      }
      toast.success("Department deleted successfully");
      fetchDepartments();
    } catch (err) {
      toast.error(err.message || "Failed to delete department");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingDepartment ? "Edit Department" : "Add Department"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  disabled={saving}
                ></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <label className="form-label">Department Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter department name"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={closeModal}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Departments</h4>
              <button className="btn btn-primary btn-sm" onClick={openAddModal}>
                <i className="mdi mdi-plus-circle-outline"></i> Add Department
              </button>
            </div>
            <div className="card-body">
              {loading && (
                <div className="alert alert-info mb-0">
                  Loading departments...
                </div>
              )}
              {error && <div className="alert alert-danger mb-0">{error}</div>}

              {!loading && departments.length === 0 && (
                <div className="alert alert-warning mb-0">
                  No departments found.
                </div>
              )}

              {!loading && departments.length > 0 && (
                <div className="table-responsive">
                  <table
                    id="department-datatable"
                    className="table table-hover table-bordered table-striped dt-responsive"
                    style={{ width: "100%" }}
                  >
                    <thead className="bg-light">
                      <tr>
                        <th>Name</th>
                        <th>Created By</th>
                        <th>Updated By</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((department) => (
                        <tr key={department._id}>
                          <td>{department.name || "-"}</td>
                          <td>
                            {department.createdBy?.name ||
                              department.createdBy ||
                              "-"}
                          </td>
                          <td>
                            {department.updatedBy?.name ||
                              department.updatedBy ||
                              "-"}
                          </td>
                          <td>
                            {department.createdAt
                              ? new Date(
                                  department.createdAt,
                                ).toLocaleDateString("en-PK")
                              : "-"}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => openEditModal(department)}
                                title="Edit"
                              >
                                <i className="mdi mdi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(department)}
                                disabled={deletingId === department._id}
                                title="Delete"
                              >
                                {deletingId === department._id ? (
                                  "..."
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

export default Department;
