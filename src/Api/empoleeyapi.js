const createEmployee = async (Data) => {
  try {
    const response = await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        "Error creating employee:",
        result.message || "Unknown error",
      );
      return result;
    }

    console.log("Employee created successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { createEmployee };
//get all employees
const getAllEmployees = async () => {
  try {
    const response = await fetch("/api/employees");
    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Error fetching employees:",
        result.message || "Unknown error",
      );
      return result;
    }
    console.log("Employees fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { getAllEmployees };
//get single employee
const getSingleEmployee = async (id) => {
  try {
    const response = await fetch(`/api/employees/${id}`);
    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Error fetching employee:",
        result.message || "Unknown error",
      );
      return result;
    }
    console.log("Employee fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { getSingleEmployee };
//update employee
const updateEmployee = async (id, Data) => {
  try {
    const response = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        "Error updating employee:",
        result.message || "Unknown error",
      );
      return result;
    }

    console.log("Employee updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { updateEmployee };
//delete employee
const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`/api/employees/deleteEmployee/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Error deleting employee:",
        result.message || "Unknown error",
      );
      return result;
    }
    console.log("Employee deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { deleteEmployee };
