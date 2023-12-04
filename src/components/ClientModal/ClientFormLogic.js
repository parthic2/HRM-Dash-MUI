import { useEffect, useState } from 'react';

const ClientFormLogic = (clientData, editClientId) => {
  const initialFormValue = {
    client_name: "",
    client_email: "",
    organization: "",
    phone_no: "",
    website: "",
    address: "",
    country: ""
  }

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);

  const validateField = (name, value) => {
    switch (name) {
      case "client_name":
        if (value.trim() === "") {
          return "Client name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Client name should contain only characters";
        }
        break;
      case "organization":
        if (value.trim() === "") {
          return "Organization is required";
        }
        break;
      case "phone_no":
        if (value.trim() === "") {
          return "Phone number is required";
        } else if (!/^[0-9]+$/.test(value)) {
          return "Phone number should contain only number";
        }
        break;
      case "website":
        if (value.trim() === "") {
          return "Website is required";
        }
        break;
      case "address":
        if (value.trim() === "") {
          return "Address is required";
        }
        break;
      case "country":
        if (value.trim() === "") {
          return "Country is required";
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
    const selectedClient = clientData.find((client) => client.id === editClientId);

    if (selectedClient) {
      setFormData(selectedClient);
    } else {
      setFormData({
        ...initialFormValue
      });
    }
  }, [editClientId, clientData]);

  return {
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue
  }
}

export default ClientFormLogic;