import { Button, DialogContentText, Grid, Divider, MenuItem, TextField, InputLabel, Typography, CardContent, CardActions, FormControl, Select } from '@mui/material';
import { DropFiles } from 'src/@core/DropFile/DropFiles';
import { useEffect, useRef } from 'react';
import AnnouncementFormLogic from './AnnouncementFormLogic';

const AnnouncementForm = ({ handleClose, editAnnoId, announcementData, setOpen }) => {
  const { formData, handleImageChange, handleInputChange, errors, validateForm, setFormData, initialFormValue } = AnnouncementFormLogic(announcementData, editAnnoId);

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

  const isInEditMode = !!editAnnoId;

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
                  label='Announcement Title'
                  id="anno_title"
                  name="anno_title"
                  value={formData.anno_title}
                  onChange={handleInputChange}
                />
                {errors.anno_title && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.anno_title}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Announcement Details'
                  id="anno_detail"
                  name="anno_detail"
                  value={formData.anno_detail}
                  onChange={handleInputChange}
                />
                {errors.anno_detail && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.anno_detail}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Select Department</InputLabel>
                  <Select
                    label='Select Department'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <MenuItem value='Front'>Front end</MenuItem>
                    <MenuItem value='Back'>Back end</MenuItem>
                    <MenuItem value='Full'>Full stack</MenuItem>
                  </Select>
                </FormControl>
                {errors.department && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.department}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <div
                  id="doc"
                  name="doc"
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

export default AnnouncementForm;