import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createDesignation,
  getAllDesignations,
  updateDesignation,
  deleteDesignation,
} from "../Api/Desigination.js";
import { getAllDepartments } from "../Api/Departmentapi.js";

const Desigination = () => {
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingDesignation, setEditingDesignation] = useState(null);
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchDesignations = async () => {
    try {
      setLoading(true);
      setError("");
      const [designationRes, departmentRes] = await Promise.all([
        getAllDesignations(),
        getAllDepartments(),
      ]);

      if (designationRes?.success === false) {
        throw new Error(
          designationRes?.message || "Error fetching designations",
        );
      }
      if (departmentRes?.success === false) {
        throw new Error(departmentRes?.message || "Error fetching departments");
      }

      setDesignations(designationRes?.data || []);
      setDepartments(departmentRes?.data || []);
    } catch (err) {
      setError(err.message || "Error fetching designations");
      toast.error(err.message || "Error fetching designations");
      setDesignations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  useEffect(() => {
    if (
      designations.length > 0 &&
      typeof window.$ !== "undefined" &&
      typeof window.$.fn.DataTable !== "undefined"
    ) {
      const table = window.$("#designation-datatable");
      if (table.length > 0) {
        if (window.$.fn.DataTable.isDataTable("#designation-datatable")) {
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
  }, [designations]);

  const openAddModal = () => {
    setEditingDesignation(null);
    setTitle("");
    setDepartment("");
    setShowModal(true);
  };

  const openEditModal = (designation) => {
    setEditingDesignation(designation);
    setTitle(designation?.title || "");
    setDepartment(
      designation?.department?._id || designation?.department || "",
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDesignation(null);
    setTitle("");
    setDepartment("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Designation title is required");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        title: title.trim(),
        department: department || undefined,
      };

      if (editingDesignation?._id) {
        const updateResult = await updateDesignation(
          editingDesignation._id,
          payload,
        );
        if (updateResult?.success === false) {
          throw new Error(
            updateResult?.message || "Failed to update designation",
          );
        }
        toast.success("Designation updated successfully");
      } else {
        const createResult = await createDesignation(payload);
        if (createResult?.success === false) {
          throw new Error(
            createResult?.message || "Failed to create designation",
          );
        }
        toast.success("Designation added successfully");
      }

      closeModal();
      fetchDesignations();
    } catch (err) {
      toast.error(err.message || "Failed to save designation");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (designation) => {
    if (!window.confirm(`Delete designation ${designation.title}?`)) {
      return;
    }

    try {
      setDeletingId(designation._id);
      const deleteResult = await deleteDesignation(designation._id);
      if (deleteResult?.success === false) {
        throw new Error(
          deleteResult?.message || "Failed to delete designation",
        );
      }
      toast.success("Designation deleted successfully");
      fetchDesignations();
    } catch (err) {
      toast.error(err.message || "Failed to delete designation");
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
                  {editingDesignation ? "Edit Designation" : "Add Designation"}
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
                  <div className="mb-3">
                    <label className="form-label">Designation Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter designation title"
                    />
                  </div>

                  <div>
                    <label className="form-label">Department</label>
                    <select
                      className="form-select"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">Select department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
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
              <h4 className="card-title mb-0">Designations</h4>
              <button className="btn btn-primary btn-sm" onClick={openAddModal}>
                <i className="mdi mdi-plus-circle-outline"></i> Add Designation
              </button>
            </div>

            <div className="card-body">
              {loading && (
                <div className="alert alert-info mb-0">
                  Loading designations...
                </div>
              )}
              {error && <div className="alert alert-danger mb-0">{error}</div>}
              {!loading && designations.length === 0 && (
                <div className="alert alert-warning mb-0">
                  No designations found.
                </div>
              )}

              {!loading && designations.length > 0 && (
                <div className="table-responsive">
                  <table
                    id="designation-datatable"
                    className="table table-hover table-bordered table-striped dt-responsive"
                    style={{ width: "100%" }}
                  >
                    <thead className="bg-light">
                      <tr>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {designations.map((designation) => {
                        const dept = departments.find(
                          (item) =>
                            item._id ===
                            (designation.department?._id ||
                              designation.department),
                        );

                        return (
                          <tr key={designation._id}>
                            <td>{designation.title || "-"}</td>
                            <td>
                              {designation.department?.name ||
                                dept?.name ||
                                "-"}
                            </td>
                            <td>
                              {designation.createdAt
                                ? new Date(
                                    designation.createdAt,
                                  ).toLocaleDateString("en-PK")
                                : "-"}
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-warning"
                                  onClick={() => openEditModal(designation)}
                                >
                                  <i className="mdi mdi-pencil"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDelete(designation)}
                                  disabled={deletingId === designation._id}
                                >
                                  {deletingId === designation._id ? (
                                    "..."
                                  ) : (
                                    <i className="mdi mdi-delete"></i>
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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

export default Desigination;
