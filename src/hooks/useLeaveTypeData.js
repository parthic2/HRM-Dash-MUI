import { useState } from "react";

const useLeaveTypeData = () => {
  const [leaveTypeData, setLeaveTypeData] = useState([]);
  const [editLeaveTypeId, setEditLeaveTypeId] = useState(null);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('body');
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

  const handleClose = () => {
    setOpen(false);
    setEditLeaveTypeId(null);
  };

  // for dialog box
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  return {
    leaveTypeData,
    editLeaveTypeId,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose
  }
}

export default useLeaveTypeData;