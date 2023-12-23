import { Button, DialogContentText, Grid, Divider, TextField, Typography, CardContent, CardActions, MenuItem, InputLabel, FormControl, Select } from '@mui/material';
import { useEffect, useRef } from 'react';
import LeaveRequestFormLogic from './LeaveRequestFormLogic';

const LeaveRequestForm = ({ handleClose, setOpen }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = LeaveRequestFormLogic();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If the form is not valid, don't submit
    }

    // if (editEmployeeId) {
    //   editEmployee({ ...formData, id: editEmployeeId });
    // } else {
    //   addEmployee(formData);
    // }
    setFormData(initialFormValue);
    setOpen(false);
  };

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
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Leave Type'
                  id="leave_type"
                  name="leave_type"
                  value={formData.leave_type}
                  onChange={handleInputChange}
                />
                {errors.leave_type && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.leave_type}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label='Applying Date'
                  id="apply_date"
                  name="apply_date"
                  value={formData.apply_date}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    placeholder: '', // Set an empty string as the placeholder
                  }}
                />
                {errors.apply_date && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.apply_date}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Total Days</InputLabel>
                  <Select
                    label='Total Days'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id="total_days"
                    name="total_days"
                    value={formData.total_days}
                    onChange={handleInputChange}
                  >
                    <MenuItem value='Half Day'>Half Day</MenuItem>
                    <MenuItem value='Full Day'>Full Day</MenuItem>
                  </Select>
                </FormControl>
                {errors.total_days && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.total_days}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label='Start Date'
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    placeholder: '', // Set an empty string as the placeholder
                  }}
                />
                {errors.start_date && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.start_date}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label='End Date'
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    placeholder: '', // Set an empty string as the placeholder
                  }}
                />
                {errors.end_date && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.end_date}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label='Description'
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                {errors.description && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.description}</Typography>}
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Save
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </CardActions>
        </form>
      </DialogContentText>
    </>
  )
}

export default LeaveRequestForm;