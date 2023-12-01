import JobForm from './JobForm';
import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';

const JobModal = ({ editJobId, jobData, open, setOpen, scroll, handleClickOpen, handleClose }) => {
  return (
    <>
      <Box sx={{ mt: 2, textAlign: "end" }}>
        <Button variant='contained' onClick={handleClickOpen('body')}>Add Jobs</Button>
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
            {editJobId ? 'Edit Jobs' : 'Add Jobs'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'}>
          <JobForm handleClose={handleClose} editJobId={editJobId} jobData={jobData} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default JobModal;