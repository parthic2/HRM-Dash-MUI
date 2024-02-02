import React from 'react';
import { Card } from '@mui/material';
import useLeaveReqData from 'src/hooks/useLeaveReqData';
import LeaveRequestModal from 'src/components/LeaveRequest/LeaveRequestModal';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import LeaveRequestTable from './LeaveRequestTable';

const LeaveRequest = () => {
  const router = useRouter();
  const { leaveReqData, open, setOpen, scroll, handleClickOpen, handleClose, addLeaveRequest, updateLeaveRequestStatus } = useLeaveReqData();

  return (
    <>
      {router.pathname === "/" ? "" :
        <LeaveRequestModal leaveReqData={leaveReqData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} addLeaveRequest={addLeaveRequest} />
      }

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <LeaveRequestTable
            leaveReqData={leaveReqData}
            router={router}
            updateLeaveRequestStatus={updateLeaveRequestStatus}
          />
        </Card>
      </motion.div>
    </>
  )
}

export default LeaveRequest;