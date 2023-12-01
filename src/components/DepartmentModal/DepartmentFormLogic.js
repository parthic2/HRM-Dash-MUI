import { useEffect, useState } from "react";

const DepartmentFormLogic = (departmentData, editDepartId) => {
  const initialFormValue = {
    depart_name: "",
    depart_head: "",
    depart_email: "",
    start_date: "",
    team_member: ""
  }

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);

  const validateField = (name, value) => {
    switch (name) {
      case "depart_name":
        if (value.trim() === "") {
          return "Department name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Department name should contain only characters";
        }
        break;
      case "depart_head":
        if (value.trim() === "") {
          return "Department head is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Department head should contain only characters";
        }
        break;
      case "depart_email":
        if (value.trim() === "") {
          return "Department email address is required";
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(value)) {
          return "Invalid email address";
        }
        break;
      case "start_date":
        if (value.trim() === "") {
          return "Starting date is required";
        }
        break;
      case "team_member":
        if (value.trim() === "") {
          return "Team member is required";
        } else if (!/^[0-9]+$/.test(value)) {
          return "Team member should contain only number";
        }
        break;
    }

    return "";
  }

  const validateForm = () => {
    const newErrors = {};
    Object.keys(initialFormValue).forEach((name) => {
      const value = formData[name];
      const error = validateField(name, value);
      newErrors[name] = error;
    });

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const error = validateField(name, value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  useEffect(() => {
    const selectedDepartment = departmentData.find((depart) => depart.id === editDepartId);

    if (selectedDepartment) {
      setFormData(selectedDepartment);
    } else {
      setFormData({
        ...initialFormValue
      });
    }
  }, [editDepartId, departmentData]);

  return {
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue
  }
}

export default DepartmentFormLogic;