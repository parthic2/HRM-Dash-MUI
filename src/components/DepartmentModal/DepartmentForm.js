import { Button, DialogContentText, Grid, Divider, TextField, Typography, CardContent, CardActions } from '@mui/material';
import { useEffect, useRef } from 'react';
import DepartmentFormLogic from './DepartmentFormLogic';

const DepartmentForm = ({ handleClose, editDepartId, setOpen, departmentData }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = DepartmentFormLogic(departmentData, editDepartId);

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

  const isInEditMode = !!editDepartId;

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
                  label='Department Name'
                  id="depart_name"
                  name="depart_name"
                  value={formData.depart_name}
                  onChange={handleInputChange}
                />
                {errors.depart_name && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.depart_name}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Department Head'
                  id="depart_head"
                  name="depart_head"
                  value={formData.depart_head}
                  onChange={handleInputChange}
                />
                {errors.depart_head && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.depart_head}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Department Email'
                  id="depart_email"
                  name="depart_email"
                  value={formData.depart_email}
                  onChange={handleInputChange}
                />
                {errors.depart_email && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.depart_email}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label='Starting Date'
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
                  label='Team Members'
                  id="team_member"
                  name="team_member"
                  value={formData.team_member}
                  onChange={handleInputChange}
                />
                {errors.team_member && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.team_member}</Typography>}
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
            {isInEditMode ? (
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                Update
              </Button>
            ) : (
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                Save
              </Button>
            )}
            <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </CardActions>
        </form>
      </DialogContentText>
    </>
  )
}

export default DepartmentForm;