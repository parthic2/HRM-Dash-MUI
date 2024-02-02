import React from 'react';
import { Card } from '@mui/material';
import useLeaveTypeData from 'src/hooks/useLeaveTypeData';
import LeaveTypeModal from 'src/components/LeaveType/LeaveTypeModal';
import { motion } from "framer-motion";
import LeaveTypeTable from './LeaveTypeTable';

const LeaveType = () => {
  const { leaveTypeData, editLeaveTypeId, open, setOpen, scroll, handleClickOpen, handleClose, handleEdit, deleteLeaveType, addLeaveType, editLeaveType, updateLeaveTypeStatus } = useLeaveTypeData();

  return (
    <>
      <LeaveTypeModal editLeaveTypeId={editLeaveTypeId} leaveTypeData={leaveTypeData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} addLeaveType={addLeaveType} editLeaveType={editLeaveType} />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card sx={{ mt: 3 }}>
          <LeaveTypeTable
            leaveTypeData={leaveTypeData}
            updateLeaveTypeStatus={updateLeaveTypeStatus}
            handleEdit={handleEdit}
            deleteLeaveType={deleteLeaveType}
          />
        </Card>
      </motion.div>
    </>
  )
}

export default LeaveType;