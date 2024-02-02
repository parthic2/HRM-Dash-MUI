import { useEffect, useState } from "react";

const useAwardsData = () => {
    const [awardsData, setAwardsData] = useState(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('awardsData')) || [] : []);
    const [editAwardId, setEditAwardId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
        setEditAwardId(null);
    };

    // For Edit data
    const handleEdit = (id) => {
        setEditAwardId(id);
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
    const addAwards = (formData) => {
        // Generate a unique ID
        const newId = generateUniqueId();

        // Add new data with the unique ID
        const newData = [...awardsData, { id: newId, ...formData }];
        setAwardsData(newData);

        // Update localStorage
        localStorage.setItem('awardsData', JSON.stringify(newData));
    }

    // Function to edit form data to localStorage
    const editAwards = (editedAward) => {
        const updatedData = awardsData.map((award) => award.id === editedAward.id ? editedAward : award);

        setAwardsData(updatedData);
        setEditAwardId(null);

        // Update localStorage
        localStorage.setItem('awardsData', JSON.stringify(updatedData));
    }

    // Function to delete form data to localStorage
    const deleteAwards = (id) => {
        const updatedData = awardsData.filter((award) => award.id !== id);
        setAwardsData(updatedData);

        localStorage.setItem('awardsData', JSON.stringify(updatedData));
    }

    return {
        awardsData,
        editAwardId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        addAwards,
        editAwards,
        deleteAwards
    }
}

export default useAwardsData;