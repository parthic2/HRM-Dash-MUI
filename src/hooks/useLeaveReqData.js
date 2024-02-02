import { useState } from 'react';

const useLeaveReqData = () => {
    const [leaveReqData, setLeaveReqData] = useState(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('leaveRequestsData')) || [] : []);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
    };

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const updateLeaveRequestStatus = (id, newStatus) => {
        // Assuming leaveReqData is an array of objects with an 'id' property
        const updatedData = leaveReqData.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
        );

        // Update the state with the new data
        setLeaveReqData(updatedData);

        // Update localStorage with the approval/rejection status
        const approvalStatus = newStatus === "Approved" ? 1 : newStatus === "Rejected" ? 2 : 0;

        const approvalLocalStorage = JSON.parse(localStorage.getItem('approvalLocalStorage')) || {};

        approvalLocalStorage[id] = approvalStatus;
        
        localStorage.setItem('approvalLocalStorage', JSON.stringify(approvalLocalStorage));
    };

    // Function to generate a unique ID (you can use a more robust library for this)
    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9); // Just a simple example, not production-ready
    };

    // Function to add form data to localStorage
    const addLeaveRequest = (formData) => {
        // Generate a unique ID
        const newId = generateUniqueId();

        // Add new data with the unique ID
        const newData = [...leaveReqData, { ...formData, id: newId }];
        setLeaveReqData(newData);

        // Update localStorage
        localStorage.setItem('leaveRequestsData', JSON.stringify(newData));
    }

    return {
        leaveReqData,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        addLeaveRequest,
        updateLeaveRequestStatus
    }
}

export default useLeaveReqData;