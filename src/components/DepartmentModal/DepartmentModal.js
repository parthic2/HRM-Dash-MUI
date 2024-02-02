import { Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import DepartmentForm from './DepartmentForm';
import { motion } from "framer-motion";

const DepartmentModal = ({ editDepartId, departmentData, open, setOpen, scroll, handleClickOpen, handleClose, addDepartments }) => {
  return (
    <>
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
        Add Departments
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant='h6' fontWeight={600}>
            {editDepartId ? 'Edit Departments' : 'Add Departments'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'}>
          <DepartmentForm handleClose={handleClose} editDepartId={editDepartId} departmentData={departmentData} setOpen={setOpen} addDepartments={addDepartments} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DepartmentModal;