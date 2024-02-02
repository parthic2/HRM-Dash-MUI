import { useEffect, useState } from 'react';

const useAnnouncementData = () => {
    const [announcementData, setAnnouncementData] = useState(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('announcementData')) || [] : []);
    const [editAnnoId, setEditAnnoId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
        setEditAnnoId(null);
    };

    // For Edit data
    const handleEdit = (id) => {
        setEditAnnoId(id);
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
    const addAnnouncement = (formData) => {
        // Generate a unique ID
        const newId = generateUniqueId();

        // Add new data with the unique ID
        const newData = [...announcementData, { id: newId, ...formData }];
        setAnnouncementData(newData);

        // Update localStorage
        localStorage.setItem('announcementData', JSON.stringify(newData));
    }

    // Function to edit form data to localStorage
    const editAnnouncement = (editedAnn) => {
        const updatedData = announcementData.map((anno) => anno.id === editedAnn.id ? editedAnn : anno);

        setAnnouncementData(updatedData);
        setEditAnnoId(null);

        // Update localStorage
        localStorage.setItem('announcementData', JSON.stringify(updatedData));
    }

    // Function to delete form data to localStorage
    const deleteAnnouncement = (id) => {
        const updatedData = announcementData.filter((anno) => anno.id !== id);
        setAnnouncementData(updatedData);

        localStorage.setItem('announcementData', JSON.stringify(updatedData));
    }

    return {
        announcementData,
        editAnnoId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        addAnnouncement,
        editAnnouncement,
        deleteAnnouncement
    }
}

export default useAnnouncementData;