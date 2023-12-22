import JobForm from './JobForm';
import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import { motion } from "framer-motion";

const JobModal = ({ editJobId, jobData, open, setOpen, scroll, handleClickOpen, handleClose }) => {
  return (
    <>
      <Box sx={{ mt: 2, textAlign: "end" }}>
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
          Add Jobs
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