import { useState, useEffect } from "react";
import * as api from "../Api/empoleeyapi.js";

export const getAllEmployees = () => {
  let [employees, updateEmployees] = useState([]);
  const employeesData = async () => {
    const data = await api.getAllEmployees();
    updateEmployees(data);
  };
  useEffect(() => {
    employeesData();
  }, []);

  return { employees, employeesData };
};
