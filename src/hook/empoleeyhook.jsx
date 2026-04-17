import { useState, useEffect } from "react";
import * as api from "../Api/empoleeyapi.js";

export const useGetAllEmployees = () => {
  let [employees, updateEmployees] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);

  const employeesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getAllEmployees();

      if (response.success && response.data) {
        updateEmployees(response.data);
      } else {
        updateEmployees([]);
        setError(response.message || "Failed to fetch employees");
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.message || "Error fetching employees");
      updateEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    employeesData();
  }, []);

  return { employees, employeesData, loading, error };
};
