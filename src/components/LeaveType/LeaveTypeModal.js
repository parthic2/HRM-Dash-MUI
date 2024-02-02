import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import LeaveTypeForm from './LeaveTypeForm';
import { motion } from "framer-motion";

const LeaveTypeModal = ({ leaveTypeData, editLeaveTypeId, open, setOpen, scroll, handleClickOpen, handleClose, addLeaveType, editLeaveType }) => {
  return (
    <>
      <Box sx={{ mt: 3, textAlign: "end" }}>
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
          Add Leave Type
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant='h6' fontWeight={600}>
            {editLeaveTypeId ? 'Edit Leave Type' : 'Add Leave Type'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'}>
          <LeaveTypeForm handleClose={handleClose} editLeaveTypeId={editLeaveTypeId} leaveTypeData={leaveTypeData} setOpen={setOpen} addLeaveType={addLeaveType} editLeaveType={editLeaveType} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LeaveTypeModal;