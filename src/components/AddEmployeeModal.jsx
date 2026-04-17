import { useState, useEffect } from "react";
import * as api from "../Api/empoleeyapi.js";

const AddEmployeeModal = ({
  show,
  onClose,
  onEmployeeAdded,
  editingEmployee,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    CNIC: "",
    dateOfBirth: "",
    gender: "Male",
    dateOfJoining: new Date().toISOString().split("T")[0],
    salary: "",
    status: "Active",
    department: "",
    designation: "",
    shift: "",
  });

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const isEditMode = !!editingEmployee;

  // Populate form when editing
  useEffect(() => {
    if (show && editingEmployee) {
      setFormData({
        firstName: editingEmployee.firstName || "",
        lastName: editingEmployee.lastName || "",
        email: editingEmployee.email || "",
        phone: editingEmployee.phone || "",
        CNIC: editingEmployee.CNIC || "",
        dateOfBirth: editingEmployee.dateOfBirth
          ? editingEmployee.dateOfBirth.split("T")[0]
          : "",
        gender: editingEmployee.gender || "Male",
        dateOfJoining: editingEmployee.dateOfJoining
          ? editingEmployee.dateOfJoining.split("T")[0]
          : new Date().toISOString().split("T")[0],
        salary: editingEmployee.salary || "",
        status: editingEmployee.status || "Active",
        department: editingEmployee.department?._id || "",
        designation: editingEmployee.designation?._id || "",
        shift: editingEmployee.shift?._id || "",
      });
    } else if (show && !editingEmployee) {
      // Reset form for new employee
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        CNIC: "",
        dateOfBirth: "",
        gender: "Male",
        dateOfJoining: new Date().toISOString().split("T")[0],
        salary: "",
        status: "Active",
        department: "",
        designation: "",
        shift: "",
      });
    }
    setError(null);
    setSuccess(null);
  }, [show, editingEmployee]);

  // Fetch dropdown data when modal opens
  useEffect(() => {
    if (show) {
      fetchDropdownData();
    }
  }, [show]);

  const fetchDropdownData = async () => {
    try {
      // Fetch departments
      const deptResponse = await fetch("/api/departments");
      const deptData = await deptResponse.json();
      if (deptData.success && deptData.data) {
        setDepartments(deptData.data);
      }

      // Fetch designations
      const desigResponse = await fetch("/api/designations");
      const desigData = await desigResponse.json();
      if (desigData.success && desigData.data) {
        setDesignations(desigData.data);
      }

      // Fetch shifts
      const shiftResponse = await fetch("/api/shifts");
      const shiftData = await shiftResponse.json();
      if (shiftData.success && shiftData.data) {
        setShifts(shiftData.data);
      }
    } catch (err) {
      console.error("Error fetching dropdown data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error on input change
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone is required");
      return false;
    }
    if (!formData.CNIC.trim()) {
      setError("CNIC is required");
      return false;
    }
    if (!formData.dateOfBirth) {
      setError("Date of birth is required");
      return false;
    }
    if (!formData.department) {
      setError("Department is required");
      return false;
    }
    if (!formData.designation) {
      setError("Designation is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const employeeData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        CNIC: formData.CNIC.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        dateOfJoining: formData.dateOfJoining,
        salary: formData.salary ? Number(formData.salary) : 0,
        status: formData.status,
        department: formData.department,
        designation: formData.designation,
        shift: formData.shift || undefined,
      };

      let response;

      if (isEditMode) {
        // Update employee
        response = await api.updateEmployee(editingEmployee._id, employeeData);
        if (response.data || response.success) {
          setSuccess("Employee updated successfully!");
        } else {
          setError(response.message || "Failed to update employee");
        }
      } else {
        // Create new employee
        response = await api.createEmployee(employeeData);
        if (response._id || response.success) {
          setSuccess("Employee added successfully!");
        } else {
          setError(response.message || "Failed to create employee");
        }
      }

      if (response._id || response.data || response.success) {
        setTimeout(() => {
          onEmployeeAdded();
        }, 1000);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.message ||
          (isEditMode ? "Error updating employee" : "Error creating employee"),
      );
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-scrollable"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header sticky-top bg-light">
            <h5 className="modal-title">
              {isEditMode ? "Edit Employee" : "Add New Employee"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <div className="modal-body">
            {error && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>Error:</strong> {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError(null)}
                ></button>
              </div>
            )}

            {success && (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>Success:</strong> {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-sm"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="CNIC" className="form-label">
                      CNIC <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="CNIC"
                      name="CNIC"
                      value={formData.CNIC}
                      onChange={handleChange}
                      placeholder="Enter CNIC"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <select
                      className="form-select form-select-sm"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="dateOfBirth" className="form-label">
                      Date of Birth <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="dateOfJoining" className="form-label">
                      Date of Joining
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="dateOfJoining"
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="salary" className="form-label">
                      Salary (Rs.)
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="Enter salary"
                      min="0"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select form-select-sm"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Terminated">Terminated</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="department" className="form-label">
                      Department <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select form-select-sm"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="designation" className="form-label">
                      Designation <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select form-select-sm"
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Designation</option>
                      {designations.map((desig) => (
                        <option key={desig._id} value={desig._id}>
                          {desig.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="shift" className="form-label">
                      Shift
                    </label>
                    <select
                      className="form-select form-select-sm"
                      id="shift"
                      name="shift"
                      value={formData.shift}
                      onChange={handleChange}
                    >
                      <option value="">Select Shift</option>
                      {shifts.map((shift) => (
                        <option key={shift._id} value={shift._id}>
                          {shift.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer sticky-bottom bg-light">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {isEditMode ? "Updating..." : "Saving..."}
                </>
              ) : isEditMode ? (
                "Update Employee"
              ) : (
                "Save Employee"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
