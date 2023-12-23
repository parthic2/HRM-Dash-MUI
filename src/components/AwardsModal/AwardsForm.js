import { Button, DialogContentText, Grid, Divider, TextField, Typography, CardContent, CardActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useRef } from 'react';
import AwardsFormLogic from './AwardsFormLogic';

const AwardsForm = ({ handleClose, editAwardId, awardsData, setOpen }) => {
  const { formData, handleInputChange, errors, validateForm, setFormData, initialFormValue } = AwardsFormLogic(awardsData, editAwardId);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

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
                  label='Awards Name'
                  id="awards_name"
                  name="awards_name"
                  value={formData.awards_name}
                  onChange={handleInputChange}
                />
                {errors.awards_name && <Typography sx={{ color: '#FF4433', fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.awards_name}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Awards Details'
                  id="awards_details"
                  name="awards_details"
                  multiline
                  rows={3}
                  value={formData.awards_details}
                  onChange={handleInputChange}
                />
                {errors.awards_details && <Typography sx={{ color: '#FF4433', fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.awards_details}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Employee</InputLabel>
                  <Select
                    label='Employee'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id="employee"
                    name="employee"
                    value={formData.employee}
                    onChange={handleInputChange}
                  >
                    <MenuItem value='5'>5</MenuItem>
                    <MenuItem value='12'>12</MenuItem>
                    <MenuItem value='10'>10</MenuItem>
                  </Select>
                </FormControl>
                {errors.employee && <Typography sx={{ color: "#FF4433", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.employee}</Typography>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Reward'
                  id="reward"
                  name="reward"
                  value={formData.reward}
                  onChange={handleInputChange}
                />
                {errors.reward && <Typography sx={{ color: '#FF4433', fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.reward}</Typography>}
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

export default AwardsForm;