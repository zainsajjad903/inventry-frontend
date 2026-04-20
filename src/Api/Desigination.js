const createDesignation = async (Data) => {
  try {
    const response = await fetch("/api/designations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        "Error creating designation:",
        result.message || "Unknown error",
      );
      return result;
    }

    console.log("Designation created successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { createDesignation };
//get all designations
const getAllDesignations = async () => {
  try {
    const response = await fetch("/api/designations");
    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Error fetching designations:",
        result.message || "Unknown error",
      );
      return result;
    }
    console.log("Designations fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { getAllDesignations };
//get single designation
const getSingleDesignation = async (id) => {
  try {
    const response = await fetch(`/api/designations/${id}`);
    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Error fetching designation:",
        result.message || "Unknown error",
      );
      return result;
    }
    console.log("Designation fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { getSingleDesignation };
//update designation
const updateDesignation = async (id, Data) => {
  try {
    const response = await fetch(`/api/designations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(
        "Error updating designation:",
        result.message || "Unknown error",
      );
      return result;
    }

    console.log("Designation updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { updateDesignation };
//delete designation
const deleteDesignation = async (id) => {
  try {
    const response = await fetch(`/api/designations/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Error deleting designation:",
        result.message || "Unknown error",
      );
      return result;
    }
    console.log("Designation deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { deleteDesignation };
