import { useState } from "react";

const useJobData = () => {
    const [jobData, setJobData] = useState([]);
    const [editJobId, setEditJobId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
        setEditJobId(null);
    };

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    return {
        jobData,
        editJobId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose
    }
}

export default useJobData;