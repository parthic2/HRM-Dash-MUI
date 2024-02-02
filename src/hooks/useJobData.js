import { useEffect, useState } from "react";

const useJobData = () => {
    const [jobData, setJobData] = useState(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('jobsData')) || [] : []);
    const [editJobId, setEditJobId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
        setEditJobId(null);
    };

    // For Edit data
    const handleEdit = (id) => {
        setEditJobId(id);
        setOpen(true);
    }

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    // Function to generate a unique ID (you can use a more robust library for this)
    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9); // Just a simple example, not production-ready
    };

    // Function to add form data to localStorage
    const addJobs = (formData) => {
        // Generate a unique ID
        const newId = generateUniqueId();

        // Add new data with the unique ID
        const newData = [...jobData, { id: newId, ...formData }];
        setJobData(newData);

        // Update localStorage
        localStorage.setItem('jobsData', JSON.stringify(newData));
    }

    // Function to edit form data to localStorage
    const editJobs = (editedJob) => {
        const updatedData = jobData.map((job) => job.id === editedJob.id ? editedJob : job);

        setJobData(updatedData);
        setEditJobId(null);

        // Update localStorage
        localStorage.setItem('jobsData', JSON.stringify(updatedData));
    }

    // Function to delete form data to localStorage
    const deleteJobs = (id) => {
        const updatedData = jobData.filter((job) => job.id !== id);
        setJobData(updatedData);

        localStorage.setItem('jobsData', JSON.stringify(updatedData));
    }

    return {
        jobData,
        editJobId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        addJobs,
        editJobs,
        deleteJobs
    }
}

export default useJobData;