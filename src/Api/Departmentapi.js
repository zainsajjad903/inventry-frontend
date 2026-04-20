const createDepartment = async (Data) => {
  try {
    const response = await fetch("/api/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        "Error creating department:",
        result.message || "Unknown error",
      );
      return result;
    }

    console.log("Department created successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { createDepartment };
//get all departments
const getAllDepartments = async () => {
  try {
    const response = await fetch("/api/departments");
    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Error fetching departments:",
        result.message || "Unknown error",
      );
      return result;
    }
    console.log("Departments fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { getAllDepartments };
//get single department
const getSingleDepartment = async (id) => {
  try {
    const response = await fetch(`/api/departments/${id}`);
    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Error fetching department:",
        result.message || "Unknown error",
      );
      return result;
    }
    console.log("Department fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { getSingleDepartment };
//update department
const updateDepartment = async (id, Data) => {
  try {
    const response = await fetch(`/api/departments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        "Error updating department:",
        result.message || "Unknown error",
      );
      return result;
    }

    console.log("Department updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { updateDepartment };
//delete department
const deleteDepartment = async (id) => {
  try {
    const response = await fetch(`/api/departments/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Error deleting department:",
        result.message || "Unknown error",
      );
      return result;
    }
    console.log("Department deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { deleteDepartment };
