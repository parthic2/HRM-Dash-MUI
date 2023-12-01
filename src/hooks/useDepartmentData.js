import { useState } from "react";

const useDepartmentData = () => {
    const [departmentData, setDepartmentData] = useState([]);
    const [editDepartId, setEditDepartId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

    const handleClose = () => {
        setOpen(false);
        setEditDepartId(null);
    };

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    return {
        departmentData,
        editDepartId,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose
    }
}

export default useDepartmentData;