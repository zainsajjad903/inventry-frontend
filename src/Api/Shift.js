const createShift = async (Data) => {
  try {
    const response = await fetch("/api/shifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error creating shift:", result.message || "Unknown error");
      return result;
    }

    console.log("Shift created successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { createShift };
//get all shifts api
const getAllShifts = async () => {
  try {
    const response = await fetch("/api/shifts");
    const result = await response.json();
    if (!response.ok) {
      console.error(
        "Error fetching shifts:",
        result.message || "Unknown error",
      );
      return result;
    }
    console.log("Shifts fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { getAllShifts };
//get single shift
const getSingleShift = async (id) => {
  try {
    const response = await fetch(`/api/shifts/${id}`);
    const result = await response.json();
    if (!response.ok) {
      console.error("Error fetching shift:", result.message || "Unknown error");
      return result;
    }
    console.log("Shift fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { getSingleShift };
//update shift
const updateShift = async (id, Data) => {
  try {
    const response = await fetch(`/api/shifts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error updating shift:", result.message || "Unknown error");
      return result;
    }

    console.log("Shift updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { updateShift };
//delete shift
const deleteShift = async (id) => {
  try {
    const response = await fetch(`/api/shifts/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      console.error("Error deleting shift:", result.message || "Unknown error");
      return result;
    }
    console.log("Shift deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { deleteShift };
