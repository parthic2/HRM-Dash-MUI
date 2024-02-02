import { Button, DialogContentText, Grid, Divider, TextField, Typography, CardContent, CardActions, FormControl, InputLabel, Select, MenuItem, DialogActions } from '@mui/material';
import { useEffect, useRef } from 'react';
import LeaveTypeFormLogic from './LeaveTypeFormLogic';

const LeaveTypeForm = ({ handleClose, leaveTypeData, editLeaveTypeId, setOpen, addLeaveType, editLeaveType }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = LeaveTypeFormLogic(leaveTypeData, editLeaveTypeId);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If the form is not valid, don't submit
    }

    if (editLeaveTypeId) {
      editLeaveType({ ...formData, id: editLeaveTypeId });
    } else {
      addLeaveType(formData);
    }

    setFormData(initialFormValue);
    setOpen(false);
  };

  const isInEditMode = !!editLeaveTypeId;

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }, []);

  return (
    <>
      <DialogContentText
        id="scroll-dialog-description"
        ref={descriptionElementRef}
        tabIndex={-1}
      >
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Leave Type Name'
                  id="leave_name"
                  name="leave_name"
                  value={formData.leave_name}
                  onChange={handleInputChange}
                />
                {errors.leave_name && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.leave_name}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Leave Type Balance'
                  id="leave_balance"
                  name="leave_balance"
                  value={formData.leave_balance}
                  onChange={handleInputChange}
                />
                {errors.leave_balance && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.leave_balance}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Status</InputLabel>
                  <Select
                    label='Status'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <MenuItem value='Active'>Active</MenuItem>
                    <MenuItem value='Inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
                {errors.status && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.status}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label='Leave Type Adding Date'
                  id="adding_date"
                  name="adding_date"
                  value={formData.adding_date}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    placeholder: '', // Set an empty string as the placeholder
                  }}
                />
                {errors.adding_date && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.adding_date}</Typography>}
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <DialogActions>
            <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
            {isInEditMode ? (
              <Button size='large' type='submit' variant='contained'>
                Update
              </Button>
            ) : (
              <Button size='large' type='submit' variant='contained'>
                Save
              </Button>
            )}
          </DialogActions>
        </form>
      </DialogContentText>
    </>
  )
}

export default LeaveTypeForm;