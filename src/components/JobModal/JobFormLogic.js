import { useEffect, useState } from "react";

const JobFormLogic = (jobData, editJobId) => {
  const initialFormValue = {
    job_title: "",
    position: "",
    department: "",
    no_position: "",
    description: ""
  }

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);

  const validateField = (name, value) => {
    switch (name) {
      case "job_title":
        if (value.trim() === "") {
          return "Job title is required";
        }
        break;
      case "position":
        if (value.trim() === "") {
          return "Position is required";
        }
        break;
      case "department":
        if (value.trim() === "") {
          return "Department is required";
        }
        break;
      case "no_position":
        if (value.trim() === "") {
          return "No of position is required";
        } else if (!/^[0-9]+$/.test(value)) {
          return "No of position should contain only number";
        }
        break;
      case "description":
        if (value.trim() === "") {
          return "Job description is required";
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
    const selectedJobs = jobData.find((job) => job.id === editJobId);

    if (selectedJobs) {
      setFormData(selectedJobs);
    } else {
      setFormData({
        ...initialFormValue
      });
    }
  }, [editJobId, jobData]);

  return {
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue
  }
}

export default JobFormLogic;
