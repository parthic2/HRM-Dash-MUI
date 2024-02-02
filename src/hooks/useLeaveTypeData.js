import { useEffect, useState } from "react";

const useLeaveTypeData = () => {
  const [leaveTypeData, setLeaveTypeData] = useState(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('leaveType')) || [] : []);
  const [editLeaveTypeId, setEditLeaveTypeId] = useState(null);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('body');
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

  const handleClose = () => {
    setOpen(false);
    setEditLeaveTypeId(null);
  };

  // For Edit data
  const handleEdit = (id) => {
    setEditLeaveTypeId(id);
    setOpen(true);
  }

  // for dialog box
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  // Function for toggle status
  const updateLeaveTypeStatus = (id, newStatus) => {
    // Assuming leaveType is an array of objects with an 'id' property
    const updatedData = leaveTypeData.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );

    // Update the state with the new data
    setLeaveTypeData(updatedData);

    // Update localStorage
    localStorage.setItem('leaveType', JSON.stringify(updatedData));
  };

  // Function to generate a unique ID (you can use a more robust library for this)
  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9); // Just a simple example, not production-ready
  };

  // Function to add form data to localStorage
  const addLeaveType = (formData) => {
    // Generate a unique ID
    const newId = generateUniqueId();

    // Add new data with the unique ID
    const newData = [...leaveTypeData, { id: newId, ...formData }];
    setLeaveTypeData(newData);

    // Update localStorage
    localStorage.setItem('leaveType', JSON.stringify(newData));
  }

  // Function to edit form data to localStorage
  const editLeaveType = (editedLeave) => {
    const updatedData = leaveTypeData.map((leave) => leave.id === editedLeave.id ? editedLeave : leave);

    setLeaveTypeData(updatedData);
    setEditLeaveTypeId(null);

    // Update localStorage
    localStorage.setItem('leaveType', JSON.stringify(updatedData));
  }

  // Function to delete form data to localStorage
  const deleteLeaveType = (id) => {
    const updatedData = leaveTypeData.filter((leave) => leave.id !== id);
    setLeaveTypeData(updatedData);

    localStorage.setItem('leaveType', JSON.stringify(updatedData));
  }

  return {
    leaveTypeData,
    editLeaveTypeId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    addLeaveType,
    editLeaveType,
    deleteLeaveType,
    updateLeaveTypeStatus
  }
}

export default useLeaveTypeData;