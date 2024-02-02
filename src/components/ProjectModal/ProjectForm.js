import { Button, DialogContentText, Grid, Divider, MenuItem, TextField, InputLabel, Typography, CardContent, CardActions, FormControl, Select, DialogActions } from '@mui/material';
import { DropFiles } from 'src/@core/DropFile/DropFiles';
import { useEffect, useRef } from 'react';
import ProjectFormLogic from './ProjectFormLogic';

const ProjectForm = ({ handleClose, editProjectId, setOpen, projectData, addProjects, editProjects }) => {
  const { formData, handleInputChange, handleImageChange, errors, validateForm, setFormData, initialFormValue } = ProjectFormLogic(projectData, editProjectId);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If the form is not valid, don't submit
    }

    if (editProjectId) {
      editProjects({ ...formData, id: editProjectId });
    } else {
      addProjects(formData);
    }

    setFormData(initialFormValue);
    setOpen(false);
  };

  const isInEditMode = !!editProjectId;

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
                  label='Project Name'
                  id="project_name"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleInputChange}
                />
                {errors.project_name && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.project_name}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Client Name'
                  id="client_name"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleInputChange}
                />
                {errors.client_name && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.client_name}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="email"
                  label='Client Email'
                  id="client_email"
                  name="client_email"
                  value={formData.client_email}
                  onChange={handleInputChange}
                />
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
                  label='Team Member'
                  id="team_member"
                  name="team_member"
                  value={formData.team_member}
                  onChange={handleInputChange}
                />
                {errors.team_member && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.team_member}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <div
                  id="gov_doc"
                  name="gov_doc"
                  style={{
                    marginBottom: "10px",
                    padding: "20px",
                    border: "dashed",
                    borderColor: "currentColor",
                    borderWidth: "thin",
                    borderRadius: "6px",
                    textAlign: "center"
                  }}
                >
                  <DropFiles handleImageChange={handleImageChange} />
                </div>
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

export default ProjectForm;