import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Dialog, DialogActions, DialogContent, Slide } from '@mui/material';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationModal = ({ showConfirm, setShowConfirm, onSaveProject, onCancelConfirm, projectName, setProjectName, description, handleChange, setDescription, isTimerRunning }) => {

  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      open={showConfirm}
      onClose={() => setShowConfirm(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        {!isTimerRunning && (
          <>
            <FormControl fullWidth>
              <InputLabel>Project Name</InputLabel>
              <Select
                label='Project Name'
                defaultValue=''
                labelId='form-layouts-separator-select-label'
                id="name"
                name="name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              >
                <MenuItem value='Abc'>Abc</MenuItem>
                <MenuItem value='HRM'>HRM Dashboard</MenuItem>
                <MenuItem value='furniture'>Furniture</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ mt: 5 }}
              fullWidth
              label='Description'
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyPress={handleChange}
            />
          </>
        )}

        {isTimerRunning && (
          <>
            <p>Are you sure you want to stop the timer and save the data?</p>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={onSaveProject}>
              Save
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={onCancelConfirm}>
              Cancel
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;