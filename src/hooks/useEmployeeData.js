import axios from "axios";
import { useEffect, useState } from "react";
import { bloodGroupMapping, genderMapping, roleMapping, statusMapping } from "src/data/data";

const useEmployeeData = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('body');
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

  const handleClose = () => {
    setOpen(false);
    setEditEmployeeId(null);
  };

  // for dialog box
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  // const handleEditButtonClick = (id) => {
  //   setEditEmployeeId(id);
  //   setOpen(true);
  // };

  // Helper function to handle unexpected mappings
  const getMappedValue = (value, mapping) => mapping[value.trim().toLowerCase()] || value;

  const fetchData = async () => {
    try {
      if (authToken) {
        const response = await axios.post("https://hrm.stackholic.io/api/employee/list", {}, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        });
        const data = response.data.data || [];
        setEmployeeData(data);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authToken?.token]);

  const addEmployee = async (newEmployee) => {
    try {
      const roleNumericValue = getMappedValue(newEmployee.role, roleMapping);
      const genderNumericValue = getMappedValue(newEmployee.gender, genderMapping);
      const statusNumericValue = getMappedValue(newEmployee.status, statusMapping);
      const bloodGroupNumericValue = getMappedValue(newEmployee.blood_group, bloodGroupMapping);

      const response = await axios.post("https://hrm.stackholic.io/api/employee/store", {
        ...newEmployee,
        role: roleNumericValue,
        status: statusNumericValue,
        gender: genderNumericValue,
        blood_group: bloodGroupNumericValue
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken.token}`,
        },
      });

      // Check the success status from the API response
      if (response.data.success) {
        // Instead of relying on the previous state, you can use the response data directly
        setEmployeeData((prevData) => [...prevData, response.data]);
        setOpen(false);

        // Wait for the fetchData to complete before proceeding
        fetchData();
      } else {
        console.error("Error editing employee:", response.data.message);
      }
    } catch (error) {
      console.error("Error Adding Employee:", error);
    }
  };

  const editEmployee = async (editedEmployee, id) => {
    try {
      const roleNumericValue = getMappedValue(editedEmployee.role, roleMapping);
      const genderNumericValue = getMappedValue(editedEmployee.gender, genderMapping);
      const statusNumericValue = getMappedValue(editedEmployee.status, statusMapping);
      const bloodGroupNumericValue = getMappedValue(editedEmployee.blood_group, bloodGroupMapping);

      const response = await axios.post(`https://hrm.stackholic.io/api/employee/store`, {
        id,
        ...editedEmployee,
        role: roleNumericValue,
        status: statusNumericValue,
        gender: genderNumericValue,
        blood_group: bloodGroupNumericValue
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken.token}`,
        },
      });

      // Check the success status from the API response
      if (response.data.success) {
        setEmployeeData((prevData) => prevData.map((employee) => employee.id === editedEmployee.id ? editedEmployee : employee));
        setEditEmployeeId(null); // Reset the edit state

        // Wait for the fetchData to complete before proceeding
        await fetchData();
      } else {
        console.error("Error editing employee:", response.data.message);
      }
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await axios.post("https://hrm.stackholic.io/api/employee/delete", {
        id
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.token}`,
        },
      });

      // Check the success status from the API response
      if (response.data.success) {
        // Update the local state to reflect the deletion
        const updatedData = employeeData.filter(
          (employee) => employee.id !== id
        );
        setEmployeeData(updatedData);

        fetchData();
      } else {
        console.error("Error deleting employee:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const updateEmployeeDesignation = async (employeeId, newDesignation) => {
    try {
      const employeeToUpdate = employeeData.find(employee => employee.id === employeeId);
      const roleNumericValue = getMappedValue(employeeToUpdate.role, roleMapping);
      const genderNumericValue = getMappedValue(employeeToUpdate.gender, genderMapping);
      const statusNumericValue = getMappedValue(employeeToUpdate.status, statusMapping);
      const bloodGroupNumericValue = getMappedValue(employeeToUpdate.blood_group, bloodGroupMapping);

      if (employeeToUpdate) {
        // Fetch binary data from the image URL
        // const responseImage = await axios.get(employeeToUpdate.gov_doc);
        // const blob = await responseImage.blob();

        const updatedEmployee = {
          ...employeeToUpdate,
          role: roleNumericValue,
          gender: genderNumericValue,
          status: statusNumericValue,
          blood_group: bloodGroupNumericValue,
          designation: newDesignation,

          // gov_doc: blob
        };

        const response = await axios.post("https://hrm.stackholic.io/api/employee/store", updatedEmployee, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken.token}`
          },
        });

        if (response.data.success) {
          setEmployeeData(prevData =>
            prevData.map(employee =>
              employee.id === employeeId ? updatedEmployee : employee
            )
          );
          await fetchData();
        } else {
          console.error('Error updating employee designation:', response.data.message);
        }
      } else {
        console.error('Employee not found:', employeeId);
      }
    } catch (error) {
      console.error('Error updating employee designation:', error);
    }
  }

  return {
    employeeData,
    editEmployeeId,
    addEmployee,
    editEmployee,
    deleteEmployee,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    updateEmployeeDesignation
  };
}

export default useEmployeeData;