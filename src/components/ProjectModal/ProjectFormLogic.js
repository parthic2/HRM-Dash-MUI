import { useEffect, useState } from 'react';

const ProjectFormLogic = (projectData, editProjectId) => {
  const initialFormValue = {
    project_name: "",
    client_name: "",
    client_email: "",
    start_date: "",
    end_date: "",
    status: "",
    team_member: "",
    gov_doc: ""
  }

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);

  const validateField = (name, value) => {
    switch (name) {
      case "project_name":
        if (value.trim() === "") {
          return "Project name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Project name should contain only characters";
        }
        break;
      case "client_name":
        if (value.trim() === "") {
          return "Client name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Client name should contain only characters";
        }
        break;
      case "start_date":
        if (value.trim() === "") {
          return "Start date is required";
        }
        break;
      case "status":
        if (value.trim() === "") {
          return "Status is required";
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

  const handleImageChange = (files) => {
    setFormData({
      ...formData,
      gov_doc: files[0] // Store the selected image
    });
  };

  useEffect(() => {
    const selectedProject = projectData.find((project) => project.id === editProjectId);

    if (selectedProject) {
      setFormData(selectedProject);
    } else {
      setFormData({
        ...initialFormValue
      });
    }
  }, [editProjectId, projectData]);

  return {
    handleImageChange,
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue
  }
}

export default ProjectFormLogic;