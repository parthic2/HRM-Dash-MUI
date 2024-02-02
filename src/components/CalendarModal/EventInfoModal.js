import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Divider,
} from "@mui/material";

const EventInfoModal = ({ open, handleClose, onDeleteEvent, currentEvent, onEditEvent }) => {
  const onClose = () => {
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <Typography variant='h6' fontWeight={600}>Event Information</Typography>
      </DialogTitle>
      <Divider sx={{ margin: 0 }} />
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
        >
          <span style={{ fontWeight: 600, textTransform: "capitalize" }}>Description:</span> {currentEvent && currentEvent.description}
        </DialogContentText>
      </DialogContent>
      <Divider sx={{ margin: 0 }} />
      <DialogActions>
        <Button size='large' color='error' variant='contained' onClick={onDeleteEvent}>
          Delete
        </Button>
        <Button size='large' color='secondary' variant='outlined' onClick={onClose}>
          Cancel
        </Button>
        <Button size='large' variant='contained' onClick={() => onEditEvent(currentEvent._id)}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventInfoModal;