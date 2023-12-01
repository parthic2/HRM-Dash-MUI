import { useState } from 'react';

const useAnnouncementData = () => {
    const [announcementData, setAnnouncementData] = useState([]);
    const [editAnnoId, setEditAnnoId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
        setEditAnnoId(null);
    };

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    return {
        announcementData,
        editAnnoId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose
    }
}

export default useAnnouncementData;