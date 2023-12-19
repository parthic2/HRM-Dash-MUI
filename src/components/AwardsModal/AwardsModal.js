import AwardsForm from './AwardsForm';
import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';

const AwardsModal = ({ editAwardId, awardsData, open, setOpen, scroll, handleClickOpen, handleClose }) => {
  // Remove karvanu che employee api aave aatle
  const authTokenEmp = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('employee-details')) : null;
  const roleEmp = authTokenEmp?.roles;

  return (
    <>
      {roleEmp === "Employee" ? null : (
        <Button variant='contained' onClick={handleClickOpen('body')}>Add Awards</Button>
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
            {editAwardId ? 'Edit Awards' : 'Add Awards'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'}>
          <AwardsForm handleClose={handleClose} editAwardId={editAwardId} awardsData={awardsData} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AwardsModal;