import { useState } from 'react';

const useLeaveReqData = () => {
    const [leaveReqData, setLeaveReqData] = useState([]);
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

    return {
        leaveReqData,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose
    }
}

export default useLeaveReqData;