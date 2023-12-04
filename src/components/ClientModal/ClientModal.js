import { Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import ClientForm from './ClientForm';

const ClientModal = ({ editClientId, clientData, open, setOpen, scroll, handleClickOpen, handleClose }) => {
  return (
    <>
      <Button variant='contained' onClick={handleClickOpen('body')}>Add Clients</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant='h6' fontWeight={600}>
            {editClientId ? 'Edit Clients' : 'Add Clients'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'}>
          <ClientForm handleClose={handleClose} editClientId={editClientId} clientData={clientData} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ClientModal;