import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import LeaveRequestForm from './LeaveRequestForm';
import { motion } from "framer-motion";

const LeaveRequestModal = ({ leaveReqData, open, setOpen, scroll, handleClickOpen, handleClose, addLeaveRequest }) => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
  const role = authToken?.role;

  // Remove karvanu che employee api aave aatle
  const authTokenEmp = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('employee-details')) : null;
  const roleEmp = authTokenEmp?.roles;

  return (
    <>
      {role === "HR" ? (
        <Box sx={{ my: 3, textAlign: "end" }}>
          <Button
            component={motion.div}
            whileHover={{
              scale: 0.9,
              transition: { duration: 0.4 }
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exist={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.25 }}
            variant='contained'
            onClick={handleClickOpen('body')}
          >
            Add Leave
          </Button>
        </Box>
      ) : ""}

      {roleEmp === "Employee" && (
        <Box sx={{ my: 3, textAlign: "end" }}>
          <Button
            component={motion.div}
            whileHover={{
              scale: 0.9,
              transition: { duration: 0.4 }
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exist={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.25 }}
            variant='contained'
            onClick={handleClickOpen('body')}
          >
            Apply for Leave
          </Button>
        </Box>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant='h6' fontWeight={600}>
            Add Leave Requests
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'}>
          <LeaveRequestForm handleClose={handleClose} leaveReqData={leaveReqData} setOpen={setOpen} addLeaveRequest={addLeaveRequest} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LeaveRequestModal;