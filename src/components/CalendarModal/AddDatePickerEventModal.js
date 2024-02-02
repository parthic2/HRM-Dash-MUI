import React from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Autocomplete,
  Box,
  Checkbox,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const AddDatePickerEventModal = ({
  open,
  handleClose,
  datePickerEventFormData,
  setDatePickerEventFormData,
  onAddEvent,
  todos,
}) => {

  const { description, start, end, allDay } = datePickerEventFormData;

  const onClose = () => {
    handleClose();
  };

  const onChange = (event) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      allDay: event.target.checked,
    }));
  };

  const handleTodoChange = (e, value) => {
    setDatePickerEventFormData((prevState) => ({
      ...prevState,
      todoId: value?._id,
    }));
  };

  const isDisabled = () => {
    const checkEnd = () => {
      if (!allDay && end === null) {
        return true;
      }
    };
    if (description === "" || start === null || checkEnd()) {
      return true;
    }

    return false;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <Typography variant='h6' fontWeight={600}>Add Event</Typography>
        <Typography variant='caption' fontWeight={600}>
          To add an event, please fill in the information below.
        </Typography>
      </DialogTitle>
      <Divider sx={{ margin: 0 }} />
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
        >
          <Box component="form" autoComplete="off">
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="description"
                  value={description}
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={onChange}
                />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="Start date"
                    value={start}
                    ampm={true}
                    onChange={(newValue) =>
                      setDatePickerEventFormData((prevState) => ({
                        ...prevState,
                        start: newValue ? new Date(newValue) : null,
                      }))
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <Box>
                    <Typography variant="caption" color="text" component={"span"}>
                      All day?
                    </Typography>
                    <Checkbox onChange={handleCheckboxChange} value={allDay} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="End date"
                    disabled={allDay}
                    minDate={start}
                    ampm={true}
                    value={allDay ? null : end}
                    onChange={(newValue) =>
                      setDatePickerEventFormData((prevState) => ({
                        ...prevState,
                        end: newValue ? new Date(newValue) : null,
                      }))
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </LocalizationProvider>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  onChange={handleTodoChange}
                  disablePortal
                  id="combo-box-demo"
                  options={todos}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => <TextField {...params} label="Todo" />}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
      <Divider sx={{ margin: 0 }} />
      <DialogActions>
        <Button size='large' color='secondary' variant='outlined' onClick={onClose}>
          Cancel
        </Button>
        <Button
          size='large'
          type='submit'
          sx={{ mr: 2 }}
          variant='contained'
          disabled={isDisabled()}
          onClick={onAddEvent}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDatePickerEventModal;