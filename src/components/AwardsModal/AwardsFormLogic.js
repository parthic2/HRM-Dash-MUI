import React, { useState } from 'react';

const AwardsFormLogic = () => {
  const initialFormValue = {
    awards_name: "",
    awards_details: "",
    employee: "",
    reward: ""
  }

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);

  const validateField = (name, value) => {
    switch (name) {
      case "awards_name":
        if (value.trim() === "") {
          return "Awards name is required"
        }
        break;
      case "awards_details":
        if (value.trim() === "") {
          return "Awards details is required"
        }
        break;
      case "employee":
        if (value === "") {
          return "Employee is required"
        }
      case "reward":
        if (value.trim() === "") {
          return "Reward is required"
        }
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

  return {
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue
  }
}

export default AwardsFormLogic;