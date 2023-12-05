import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import LeaveRequestForm from './LeaveRequestForm';

const LeaveRequestModal = ({ leaveReqData, open, setOpen, scroll, handleClickOpen, handleClose }) => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
  const role = authToken?.role;

  return (
    <>
      {role === "HR" ? (
        <Box sx={{ mt: 2, textAlign: "end" }}>
          <Button variant='contained' onClick={handleClickOpen('body')}>Add Leave</Button>
        </Box>
      ) : ""}
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
          <LeaveRequestForm handleClose={handleClose} leaveReqData={leaveReqData} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LeaveRequestModal;