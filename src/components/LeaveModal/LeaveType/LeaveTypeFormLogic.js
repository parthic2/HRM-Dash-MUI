import { useEffect, useState } from "react";

const LeaveTypeFormLogic = (leaveTypeData, editLeaveTypeId) => {
  const initialFormValue = {
    leave_name: "",
    leave_balance: "",
    status: "",
    adding_date: ""
  }

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);

  const validateField = (name, value) => {
    switch (name) {
      case "leave_name":
        if (value.trim() === "") {
          return "Leave name is required";
        }
        break;
      case "leave_balance":
        if (value.trim() === "") {
          return "Leave balance is required";
        } else if (!/^[0-9]+$/.test(value)) {
          return "Leave balance should contain only number";
        }
        break;
      case "status":
        if (value.trim() === "") {
          return "Status is required";
        }
        break;
      case "adding_date":
        if (value.trim() === "") {
          return "Leave adding date is required";
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
    const selectedLeaveType = leaveTypeData.find((leave) => leave.id === editLeaveTypeId);

    if (selectedLeaveType) {
      setFormData(selectedLeaveType);
    } else {
      setFormData({
        ...initialFormValue
      });
    }
  }, [editLeaveTypeId, leaveTypeData]);

  return {
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue
  }
}

export default LeaveTypeFormLogic;