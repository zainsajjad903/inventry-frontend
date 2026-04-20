import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../Api/Userapi.js";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getAllUsers();
      if (result?.success === false) {
        throw new Error(result?.message || "Error fetching users");
      }
      setUsers(result?.data || []);
    } catch (err) {
      setError(err.message || "Error fetching users");
      toast.error(err.message || "Error fetching users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (
      users.length > 0 &&
      typeof window.$ !== "undefined" &&
      typeof window.$.fn.DataTable !== "undefined"
    ) {
      const table = window.$("#user-datatable");
      if (table.length > 0) {
        if (window.$.fn.DataTable.isDataTable("#user-datatable")) {
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
  }, [users]);

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "employee",
    });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      role: user?.role || "employee",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Name and Email are required");
      return;
    }

    if (!editingUser && !formData.password.trim()) {
      toast.error("Password is required for new user");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
      };

      if (formData.password.trim()) {
        payload.password = formData.password;
      }

      if (editingUser?._id) {
        const updateResult = await updateUser(editingUser._id, payload);
        if (updateResult?.success === false) {
          throw new Error(updateResult?.message || "Failed to update user");
        }
        toast.success("User updated successfully");
      } else {
        const createResult = await createUser(payload);
        if (createResult?.success === false) {
          throw new Error(createResult?.message || "Failed to create user");
        }
        toast.success("User created successfully");
      }

      closeModal();
      fetchUsers();
    } catch (err) {
      toast.error(err.message || "Failed to save user");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user ${user.name}?`)) {
      return;
    }

    try {
      setDeletingId(user._id);
      const deleteResult = await deleteUser(user._id);
      if (deleteResult?.success === false) {
        throw new Error(deleteResult?.message || "Failed to delete user");
      }
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      toast.error(err.message || "Failed to delete user");
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
                  {editingUser ? "Edit User" : "Add User"}
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
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Password {editingUser ? "(optional)" : ""}
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                    />
                  </div>

                  <div>
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
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
              <h4 className="card-title mb-0">Users</h4>
              <button className="btn btn-primary btn-sm" onClick={openAddModal}>
                <i className="mdi mdi-plus-circle-outline"></i> Add User
              </button>
            </div>

            <div className="card-body">
              {loading && (
                <div className="alert alert-info mb-0">Loading users...</div>
              )}
              {error && <div className="alert alert-danger mb-0">{error}</div>}
              {!loading && users.length === 0 && (
                <div className="alert alert-warning mb-0">No users found.</div>
              )}

              {!loading && users.length > 0 && (
                <div className="table-responsive">
                  <table
                    id="user-datatable"
                    className="table table-hover table-bordered table-striped dt-responsive"
                    style={{ width: "100%" }}
                  >
                    <thead className="bg-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name || "-"}</td>
                          <td>{user.email || "-"}</td>
                          <td>
                            <span className="badge bg-primary text-capitalize">
                              {user.role || "-"}
                            </span>
                          </td>
                          <td>
                            {user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString(
                                  "en-PK",
                                )
                              : "-"}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => openEditModal(user)}
                              >
                                <i className="mdi mdi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(user)}
                                disabled={deletingId === user._id}
                              >
                                {deletingId === user._id ? (
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

export default User;
