import { useEffect, useState } from "react";
import { bloodGroupMapping, roleMapping, statusMapping } from "src/data/data";

export const EmployeeModalLogic = (employeeData, editEmployeeId) => {
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
        showPassword: false,
        gov_doc: "" // To store the selected image
    };

    const [formData, setFormData] = useState(initialFormValue);
    const [errors, setErrors] = useState(initialFormValue);

    // Validation function for each field
    const validateName = (value) => {
        if (value.trim() === "") {
            return "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
            return "Name should contain only characters";
        } else {
            return "";
        }
    };

    const validatePassword = (value) => {
        if (value === "") {
            return "Password is required"
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)) {
            return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        } else {
            return "";
        }
    }

    const validateEmail = (value) => {
        if (value.trim() === "") {
            return "Email Address is required";
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(value)) {
            return "Invalid email address";
        } else {
            return "";
        }
    };

    const validateNumber = (value) => {
        if (value.trim() === "") {
            return "Mobile number is required";
        } else if (!/^\d{10}$/.test(value)) {
            return "Mobile Number must be a 10-digit number";
        } else {
            return "";
        }
    };

    const validateAddress = (value) => {
        if (value.trim() === "") {
            return "Address is required";
        } else {
            return "";
        }
    };

    const validateDes = (value) => {
        if (value.trim() === "") {
            return "Designation is required";
        } else {
            return "";
        }
    };

    const validateJoinDate = (value) => {
        if (value.trim() === "") {
            return "Joining date is required";
        } else {
            return "";
        }
    };

    const validateBirDate = (value) => {
        if (value.trim() === "") {
            return "Birth date is required";
        } else {
            return "";
        }
    };

    const validateBGroup = (value) => {
        if (value.trim() === "") {
            return "Blood Group is required";
        } else if (!bloodGroupMapping[value.trim().toLowerCase()]) {
            return "Invalid Blood Group";
        } else {
            return "";
        }
    };

    const validateGender = (value) => {
        if (value === "" || value === "select gender") {
            return "Gender is required";
        } else {
            return "";
        }
    };

    const validateRole = (value) => {
        if (value.trim() === "") {
            return "Role is required";
        } else if (!roleMapping[value.trim().toLowerCase()]) {
            return "Invalid role";
        } else {
            return "";
        }
    };

    const validateStatus = (value) => {
        if (value.trim() === "") {
            return "Status is required";
        } else if (!statusMapping[value.trim().toLowerCase()]) {
            return "Invalid Status";
        } else {
            return "";
        }
    };

    const validateGovDoc = (value) => {
        if (value === "") {
            return "Government Document is required";
        } else {
            return "";
        }
    };

    const validateForm = () => {
        // Validate all form fields and set the error messages
        const newErrors = {
            user_name: validateName(formData.user_name),
            password: validatePassword(formData.password),
            email: validateEmail(formData.email),
            phone_no: validateNumber(formData.phone_no),
            address: validateAddress(formData.address),
            designation: validateDes(formData.designation),
            joining_date: validateJoinDate(formData.joining_date),
            birth_date: validateBirDate(formData.birth_date),
            gender: validateGender(formData.gender),
            blood_group: validateBGroup(formData.blood_group),
            role: validateRole(formData.role),
            status: validateStatus(formData.status),
            gov_doc: validateGovDoc(formData.gov_doc),
        };

        setErrors(newErrors);

        // Check if the form is valid by checking if there are no error messages
        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validate the current field and set the error message
        let error = "";
        if (name === "user_name") {
            error = validateName(value);
        } else if (name === "password") {
            error = validatePassword(value);
        } else if (name === "email") {
            error = validateEmail(value);
        } else if (name === "phone_no") {
            error = validateNumber(value);
        } else if (name === "address") {
            error = validateAddress(value);
        } else if (name === "designation") {
            error = validateDes(value);
        } else if (name === "joining_date") {
            error = validateJoinDate(value);
        } else if (name === "birth_date") {
            error = validateBirDate(value);
        } else if (name === "gender") {
            error = validateGender(value);
        } else if (name === "blood_group") {
            error = validateBGroup(value);
        } else if (name === "role") {
            error = validateRole(value);
        } else if (name === "status") {
            error = validateStatus(value);
        } else if (name === "gov_doc") {
            error = validateGovDoc(value);
        }

        // Set the error for the current field
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

        console.log(selectedEmployee);

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
        initialFormValue
    }
}