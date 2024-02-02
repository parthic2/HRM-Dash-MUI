import { Button, DialogContentText, Grid, Divider, TextField, Typography, CardContent, CardActions, DialogActions } from '@mui/material';
import { useEffect, useRef } from 'react';
import JobFormLogic from './JobFormLogic';

const JobForm = ({ handleClose, editJobId, setOpen, jobData, addJobs, editJobs }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = JobFormLogic(jobData, editJobId);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If the form is not valid, don't submit
    }

    if (editJobId) {
      editJobs({ ...formData, id: editJobId });
    } else {
      addJobs(formData);
    }

    setFormData(initialFormValue);
    setOpen(false);
  };

  const isInEditMode = !!editJobId;

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
                  label='Job Title'
                  id="job_title"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleInputChange}
                />
                {errors.job_title && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.job_title}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Position'
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                />
                {errors.position && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.position}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Department'
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                />
                {errors.department && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.department}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='No. of position'
                  id="no_position"
                  name="no_position"
                  value={formData.no_position}
                  onChange={handleInputChange}
                />
                {errors.no_position && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.no_position}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label='Job Description'
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

export default JobForm;