import { useState } from "react";

const useAwardsData = () => {
    const [awardsData, setAwardsData] = useState([]);
    const [editAwardId, setEditAwardId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
        setEditAwardId(null);
    };

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    return {
        awardsData,
        editAwardId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose
    }
}

export default useAwardsData;