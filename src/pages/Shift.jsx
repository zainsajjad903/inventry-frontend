import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createShift,
  getAllShifts,
  updateShift,
  deleteShift,
} from "../Api/Shift.js";

const Shift = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentRole, setCurrentRole] = useState("employee");

  const [showModal, setShowModal] = useState(false);
  const [editingShift, setEditingShift] = useState(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchShifts = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getAllShifts();
      if (result?.success === false) {
        throw new Error(result?.message || "Error fetching shifts");
      }
      setShifts(result?.data || []);
    } catch (err) {
      setError(err.message || "Error fetching shifts");
      toast.error(err.message || "Error fetching shifts");
      setShifts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  useEffect(() => {
    try {
      const authUserRaw = localStorage.getItem("authUser");
      if (authUserRaw) {
        const authUser = JSON.parse(authUserRaw);
        setCurrentRole(authUser?.role || "employee");
      }
    } catch {
      setCurrentRole("employee");
    }
  }, []);

  const canManageMasters = ["admin", "manager"].includes(currentRole);

  useEffect(() => {
    if (
      shifts.length > 0 &&
      typeof window.$ !== "undefined" &&
      typeof window.$.fn.DataTable !== "undefined"
    ) {
      const table = window.$("#shift-datatable");
      if (table.length > 0) {
        if (window.$.fn.DataTable.isDataTable("#shift-datatable")) {
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
  }, [shifts]);

  const openAddModal = () => {
    if (!canManageMasters) {
      toast.error("Only admin or manager can add shifts");
      return;
    }
    setEditingShift(null);
    setName("");
    setShowModal(true);
  };

  const openEditModal = (shift) => {
    if (!canManageMasters) {
      toast.error("Only admin or manager can edit shifts");
      return;
    }
    setEditingShift(shift);
    setName(shift?.name || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingShift(null);
    setName("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!canManageMasters) {
      toast.error("Only admin or manager can save shifts");
      return;
    }
    if (!name.trim()) {
      toast.error("Shift name is required");
      return;
    }

    try {
      setSaving(true);
      if (editingShift?._id) {
        const updateResult = await updateShift(editingShift._id, {
          name: name.trim(),
        });
        if (updateResult?.success === false) {
          throw new Error(updateResult?.message || "Failed to update shift");
        }
        toast.success("Shift updated successfully");
      } else {
        const createResult = await createShift({ name: name.trim() });
        if (createResult?.success === false) {
          throw new Error(createResult?.message || "Failed to create shift");
        }
        toast.success("Shift added successfully");
      }

      closeModal();
      fetchShifts();
    } catch (err) {
      toast.error(err.message || "Failed to save shift");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (shift) => {
    if (!canManageMasters) {
      toast.error("Only admin or manager can delete shifts");
      return;
    }
    if (!window.confirm(`Delete shift ${shift.name}?`)) {
      return;
    }

    try {
      setDeletingId(shift._id);
      const deleteResult = await deleteShift(shift._id);
      if (deleteResult?.success === false) {
        throw new Error(deleteResult?.message || "Failed to delete shift");
      }
      toast.success("Shift deleted successfully");
      fetchShifts();
    } catch (err) {
      toast.error(err.message || "Failed to delete shift");
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
                  {editingShift ? "Edit Shift" : "Add Shift"}
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
                  <label className="form-label">Shift Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter shift name"
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
              <h4 className="card-title mb-0">Shifts</h4>
              {canManageMasters ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={openAddModal}
                >
                  <i className="mdi mdi-plus-circle-outline"></i> Add Shift
                </button>
              ) : null}
            </div>

            <div className="card-body">
              {!canManageMasters && (
                <div className="alert alert-warning">
                  You can view shifts only. Admin or manager role is required to
                  add, edit, or delete.
                </div>
              )}
              {loading && (
                <div className="alert alert-info mb-0">Loading shifts...</div>
              )}
              {error && <div className="alert alert-danger mb-0">{error}</div>}
              {!loading && shifts.length === 0 && (
                <div className="alert alert-warning mb-0">No shifts found.</div>
              )}

              {!loading && shifts.length > 0 && (
                <div className="table-responsive">
                  <table
                    id="shift-datatable"
                    className="table table-hover table-bordered table-striped dt-responsive"
                    style={{ width: "100%" }}
                  >
                    <thead className="bg-light">
                      <tr>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shifts.map((shift) => (
                        <tr key={shift._id}>
                          <td>{shift.name || "-"}</td>
                          <td>
                            {shift.createdAt
                              ? new Date(shift.createdAt).toLocaleDateString(
                                  "en-PK",
                                )
                              : "-"}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => openEditModal(shift)}
                              >
                                <i className="mdi mdi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(shift)}
                                disabled={deletingId === shift._id}
                              >
                                {deletingId === shift._id ? (
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

export default Shift;
