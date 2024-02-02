import { useEffect, useState } from "react";

const useDepartmentData = () => {
    const [departmentData, setDepartmentData] = useState(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('departmentData')) || [] : []);
    const [editDepartId, setEditDepartId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
        setEditDepartId(null);
    };

    // For Edit Data
    // const handleEdit = (id) => {
    //     setEditDepartId(id);
    //     setOpen(true);
    // }

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    // Function for toggle status
    const updateDepartmentStatus = (id, newStatus) => {
        // Assuming departmentData is an array of objects with an 'id' property
        const updatedData = departmentData.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
        );

        // Update the state with the new data
        setDepartmentData(updatedData);

        // Update localStorage
        localStorage.setItem('departmentData', JSON.stringify(updatedData));
    };

    // Function to generate a unique ID (you can use a more robust library for this)
    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9); // Just a simple example, not production-ready
    };

    // Function to add from data to localStorage
    const addDepartments = (formData) => {
        // Generate a unique ID
        const newId = generateUniqueId();

        // Add new data with the unique ID
        const newData = [...departmentData, { id: newId, ...formData }];
        setDepartmentData(newData);

        // Update localStorage
        localStorage.setItem("departmentData", JSON.stringify(newData));
    }

    // Function to edit form data to localStorage
    // const editDepartment = (editedDepart) => {
    //     const updatedData = departmentData.map((department) => department.id === editedDepart.id ? editedDepart : department);

    //     setDepartmentData(updatedData);
    //     setEditDepartId(null);

    //     // Update localStorage
    //     localStorage.setItem("departmentData", JSON.stringify(updatedData));
    // }

    // // Function to delete form data to localStorage
    // const deleteDepartment = (id) => {
    //     const updatedData = departmentData.filter((department) => department.id !== id);
    //     setDepartmentData(updatedData);

    //     localStorage.setItem("departmentData", JSON.stringify(updatedData));
    // }

    return {
        departmentData,
        editDepartId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        addDepartments,
        updateDepartmentStatus
    }
}

export default useDepartmentData;