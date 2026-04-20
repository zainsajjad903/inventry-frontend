const parseJsonSafe = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const fetchList = async (endpoint) => {
  const response = await fetch(endpoint);
  const result = await parseJsonSafe(response);

  if (!response.ok) {
    throw new Error(result?.message || "Failed to fetch data");
  }

  return result;
};

const createItem = async (endpoint, payload) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await parseJsonSafe(response);

  if (!response.ok) {
    throw new Error(result?.message || "Failed to create item");
  }

  return result;
};

const updateItem = async (endpoint, id, payload) => {
  const response = await fetch(`${endpoint}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await parseJsonSafe(response);

  if (!response.ok) {
    throw new Error(result?.message || "Failed to update item");
  }

  return result;
};

const deleteItem = async (endpoint, id) => {
  const response = await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });

  const result = await parseJsonSafe(response);

  if (!response.ok) {
    throw new Error(result?.message || "Failed to delete item");
  }

  return result;
};

export { fetchList, createItem, updateItem, deleteItem };
