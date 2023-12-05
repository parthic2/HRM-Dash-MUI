import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import LeaveTypeForm from './LeaveTypeForm';

const LeaveTypeModal = ({ leaveTypeData, editLeaveTypeId, open, setOpen, scroll, handleClickOpen, handleClose }) => {
  return (
    <>
      <Box sx={{ mt: 2, textAlign: "end" }}>
        <Button variant='contained' onClick={handleClickOpen('body')}>Add Leave Type</Button>
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
          <LeaveTypeForm handleClose={handleClose} editLeaveTypeId={editLeaveTypeId} leaveTypeData={leaveTypeData} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LeaveTypeModal;