import { useEffect, useState } from 'react';

const useProjectData = () => {
    const [projectData, setProjectData] = useState(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('projectsData')) || [] : []);
    const [editProjectId, setEditProjectId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
        setEditProjectId(null);
    };

    // For Edit data
    const handleEdit = (id) => {
        setEditProjectId(id);
        setOpen(true);
    }

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    // Function for toggle status
    const updateProjectStatus = (id, newStatus) => {
        // Assuming project is an array of objects with an 'id' property
        const updatedData = projectData.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
        );

        // Update the state with the new data
        setProjectData(updatedData);

        // Update localStorage
        localStorage.setItem('projectsData', JSON.stringify(updatedData));
    };

    // Function to generate a unique ID (you can use a more robust library for this)
    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9); // Just a simple example, not production-ready
    };

    // Function to add form data to localStorage
    const addProjects = (formData) => {
        // Generate a unique ID
        const newId = generateUniqueId();

        // Add new data with the unique ID
        const newData = [...projectData, { ...formData, id: newId }];
        setProjectData(newData);

        // Update localStorage
        localStorage.setItem('projectsData', JSON.stringify(newData));
    }

    // Function to edit form data to localStorage
    const editProjects = (editedProject) => {
        const updatedData = projectData.map((project) => project.id === editedProject.id ? editedProject : project);

        setProjectData(updatedData);
        setEditProjectId(null);

        // Update localStorage
        localStorage.setItem('projectsData', JSON.stringify(updatedData));
    }

    // Function to delete form data to localStorage
    const deleteProjects = (id) => {
        const updatedData = projectData.filter((project) => project.id !== id);
        setProjectData(updatedData);

        localStorage.setItem('projectsData', JSON.stringify(updatedData));
    }

    return {
        projectData,
        editProjectId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit,
        addProjects,
        editProjects,
        deleteProjects,
        updateProjectStatus
    }
}

export default useProjectData;