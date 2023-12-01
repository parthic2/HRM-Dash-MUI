import { Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import DepartmentForm from './DepartmentForm';

const DepartmentModal = ({ editDepartId, departmentData, open, setOpen, scroll, handleClickOpen, handleClose }) => {
  return (
    <>
      <Button variant='contained' onClick={handleClickOpen('body')}>Add Departments</Button>
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
          <DepartmentForm handleClose={handleClose} editDepartId={editDepartId} departmentData={departmentData} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DepartmentModal;