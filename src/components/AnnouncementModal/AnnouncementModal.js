import { Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import AnnouncementForm from './AnnouncementForm';

const AnnouncementModal = ({ editAnnoId, announcementData, open, setOpen, scroll, handleClickOpen, handleClose }) => {
  return (
    <>
      <Button variant='contained' onClick={handleClickOpen('body')}>Add Announcements</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant='h6' fontWeight={600}>
            {editAnnoId ? 'Edit Announcements' : 'Add Announcements'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'}>
          <AnnouncementForm handleClose={handleClose} editAnnoId={editAnnoId} announcementData={announcementData} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AnnouncementModal;