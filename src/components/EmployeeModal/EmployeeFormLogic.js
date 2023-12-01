import { useEffect, useState } from "react";
import { roleMapping, statusMapping } from "src/data/data";

const EmployeeModalLogic = (employeeData, editEmployeeId) => {
  // form validation
  const initialFormValue = {
    user_name: "",
    password: "",
    email: "",
    phone_no: "",
    alternative_phone: "",
    address: "",
    designation: "",
    joining_date: "",
    birth_date: "",
    gender: "",
    blood_group: "",
    role: "",
    status: "",
    salary: "",
    holder_name: "",
    account_number: "",
    bank_name: "",
    bank_code: "",
    bank_location: "",
    showPassword: false,
    gov_doc: "" // To store the selected image
  };

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);

  const validateField = (name, value) => {
    switch (name) {
      case "user_name":
        if (value.trim() === "") {
          return "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Name should contain only characters";
        }
        break;
      case "password":
        if (value === "") {
          return "Password is required";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)) {
          return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }
        break;
      case "email":
        if (value.trim() === "") {
          return "Email address is required";
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(value)) {
          return "Invalid email address";
        }
        break;
      case "phone_no":
        if (value.trim() === "") {
          return "Mobile number is required";
        } else if (!/^\d{10}$/.test(value)) {
          return "Mobile Number must be a 10-digit number";
        }
        break;
      case "designation":
        if (value.trim() === "") {
          return "Designation is required";
        }
        break;
      case "joining_date":
        if (value.trim() === "") {
          return "Joining date is required";
        }
        break;
      case "birth_date":
        if (value.trim() === "") {
          return "Birth date is required";
        }
        break;
      case "gender":
        if (value === "" || value === "select gender") {
          return "Gender is required";
        }
        break;
      case "role":
        if (value.trim() === "") {
          return "Role is required";
        } else if (!roleMapping[value.trim().toLowerCase()]) {
          return "Invalid role";
        }
        break;
      case "status":
        if (value.trim() === "") {
          return "Status is required";
        } else if (!statusMapping[value.trim().toLowerCase()]) {
          return "Invalid Status";
        }
        break;

      // case "salary":
      //   if (value.trim() === "") {
      //     return "Salary is required";
      //   } else if (!/^[0-9]+$/.test(value)) {
      //     return "Salary should contain only number";
      //   }
      //   break;
      // case "holder_name":
      //   if (value.trim() === "") {
      //     return "Bank account holder name is required";
      //   } else if (!/^[A-Za-z\s]+$/.test(value)) {
      //     return "Bank account holder name should contain only characters";
      //   }
      //   break;
      // case "account_number":
      //   if (value.trim() === "") {
      //     return "Account number is required";
      //   } else if (!/^[0-9]+$/.test(value)) {
      //     return "Account number should contain only number";
      //   }
      //   break;
      // case "bank_name":
      //   if (value.trim() === "") {
      //     return "Bank name is required";
      //   }
      //   break;
      // case "bank_code":
      //   if (value.trim() === "") {
      //     return "IFSC code is required";
      //   } else if (!/^[0-9]+$/.test(value)) {
      //     return "IFSC code should contain only number";
      //   }
      //   break;
      // case "bank_location":
      //   if (value.trim() === "") {
      //     return "Bank branch location is required";
      //   }
      //   break;
      case "gov_doc":
        if (value === "") {
          return "Government Document is required";
        }
        break;
      default:
        break;
    }

    return ""; // If no error
  };

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
    const selectedEmployee = employeeData.find((employee) => employee.id === editEmployeeId);

    if (selectedEmployee) {
      setFormData(selectedEmployee);
    } else {
      setFormData({
        ...initialFormValue
      });
    }
  }, [editEmployeeId, employeeData]);

  return {
    handleImageChange,
    handleInputChange,
    formData,
    errors,
    validateForm,
    setFormData,
    initialFormValue,
  }
}

export default EmployeeModalLogic;