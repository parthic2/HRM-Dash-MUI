import { Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import EmployeeForm from './EmployeeForm';

const EmployeeModal = ({ editEmployeeId, employeeData, open, setOpen, scroll, handleClickOpen, handleClose }) => {
  return (
    <>
      <Button variant='contained' onClick={handleClickOpen('body')}>Add Employees</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant='h6' fontWeight={600}>{editEmployeeId ? 'Edit Employee' : 'Add Employee'}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'}>
          <EmployeeForm handleClose={handleClose} editEmployeeId={editEmployeeId} employeeData={employeeData} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EmployeeModal;