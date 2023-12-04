import { useState } from 'react';

const useClientData = () => {
    const [clientData, setClientData] = useState([]);
    const [editClientId, setEditClientId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
        setEditClientId(null);
    };

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    return {
        clientData,
        editClientId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose
    }
}

export default useClientData;