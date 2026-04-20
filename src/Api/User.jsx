const createUser = async (Data) => {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error creating user:", result.message || "Unknown error");
      return result;
    }

    console.log("User created successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { createUser };
//get all users
const getAllUsers = async () => {
  try {
    const response = await fetch("/api/users");
    const result = await response.json();
    if (!response.ok) {
      console.error("Error fetching users:", result.message || "Unknown error");
      return result;
    }
    console.log("Users fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { getAllUsers };
//get single user
const getSingleUser = async (id) => {
  try {
    const response = await fetch(`/api/users/${id}`);
    const result = await response.json();
    if (!response.ok) {
      console.error("Error fetching user:", result.message || "Unknown error");
      return result;
    }
    console.log("User fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { getSingleUser };
//update user
const updateUser = async (id, Data) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error updating user:", result.message || "Unknown error");
      return result;
    }

    console.log("User updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { updateUser };
//delete user
const deleteUser = async (id) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      console.error("Error deleting user:", result.message || "Unknown error");
      return result;
    }
    console.log("User deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Network or parsing error:", error);
    throw error;
  }
};
export { deleteUser };
