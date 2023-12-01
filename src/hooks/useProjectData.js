import { useState } from 'react';

const useProjectData = () => {
    const [projectData, setProjectData] = useState([]);
    const [editProjectId, setEditProjectId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
        setEditProjectId(null);
    };

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    return {
        projectData,
        editProjectId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose
    }
}

export default useProjectData;