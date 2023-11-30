import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { DropFiles } from 'src/@core/DropFile/DropFiles';
import { useEffect, useRef } from 'react';
import useEmployeeData from 'src/hooks/useEmployeeData';
import EmployeeModalLogic from './EmployeeFormLogic';

const EmployeeForm = ({ handleClose, editEmployeeId, setOpen, employeeData }) => {
  const { formData, handleInputChange, handleImageChange, errors, validateForm, setFormData, initialFormValue } = EmployeeModalLogic(employeeData, editEmployeeId);

  const { addEmployee, editEmployee } = useEmployeeData();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If the form is not valid, don't submit
    }

    if (editEmployeeId) {
      editEmployee({ ...formData, id: editEmployeeId });
    } else {
      addEmployee(formData);
    }
    setFormData(initialFormValue);
    setOpen(false);
  };

  const isInEditMode = !!editEmployeeId;

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
                  label='Name'
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  disabled={isInEditMode}
                />
                {errors.user_name && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.user_name}</Typography>}
              </Grid>
              {!isInEditMode ?
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
                    <OutlinedInput
                      label='Password'
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      type={formData.showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() =>
                              setFormData({
                                ...formData,
                                showPassword: !formData.showPassword
                              })
                            }
                            aria-label='toggle password visibility'
                          >
                            {formData.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.password && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.password}</Typography>}
                  </FormControl>
                </Grid>
                : ""}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.email}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Address'
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {errors.address && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.address}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Designation'
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
                {errors.designation && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.designation}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Mobile No.'
                  id="phone_no"
                  name="phone_no"
                  maxLength={10}
                  value={formData.phone_no}
                  onChange={handleInputChange}
                />
                {errors.phone_no && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.phone_no}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Alternative No.'
                  id="alternative_phone"
                  name="alternative_phone"
                  maxLength="10"
                  value={formData.alternative_phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Birth Date'
                  id="birth_date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  disabled={isInEditMode}
                />
                {errors.birth_date && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.birth_date}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Joining Date'
                  id="joining_date"
                  name="joining_date"
                  value={formData.joining_date}
                  onChange={handleInputChange}
                  disabled={isInEditMode}
                />
                {errors.joining_date && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.joining_date}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label='Gender'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={isInEditMode}
                  >
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                  </Select>
                </FormControl>
                {errors.gender && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.gender}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Blood Group</InputLabel>
                  <Select
                    label='Blood Group'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id="blood_group"
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleInputChange}
                    disabled={isInEditMode}
                  >
                    <MenuItem value='A+'>A+</MenuItem>
                    <MenuItem value='A-'>A-</MenuItem>
                    <MenuItem value='B+'>B+</MenuItem>
                    <MenuItem value='B-'>B-</MenuItem>
                    <MenuItem value='AB+'>AB+</MenuItem>
                    <MenuItem value='AB-'>AB-</MenuItem>
                    <MenuItem value='O-'>O-</MenuItem>
                    <MenuItem value='O+'>O+</MenuItem>
                  </Select>
                </FormControl>
                {errors.blood_group && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.blood_group}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Role</InputLabel>
                  <Select
                    label='Role'
                    defaultValue=''
                    labelId='form-layouts-separator-select-label'
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <MenuItem value='HR'>HR</MenuItem>
                    <MenuItem value='Employee'>Employee</MenuItem>
                  </Select>
                </FormControl>
                {errors.role && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.role}</Typography>}
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
                {errors.status && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.status}</Typography>}
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
                {errors.gov_doc && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.gov_doc}</Typography>}
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

export default EmployeeForm;