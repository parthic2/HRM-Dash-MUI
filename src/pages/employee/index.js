import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
import Card from '@mui/material/Card';
import axios from 'axios';

const { default: TableStickyHeader } = require("src/views/tables/TableStickyHeader");

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

// Role mapping object
const roleMapping = {
  hr: 1,
  employee: 2,
};

// Status mapping object
const statusMapping = {
  active: 1,
  inactive: 2,
};

// Gender mapping object
const genderMapping = {
  male: 1,
  female: 2,
};

const bloodGroupMapping = {
  'a+': 1,
  'a-': 2,
  'b+': 3,
  'b-': 4,
  'ab+': 5,
  'ab-': 6,
  'o+': 7,
  'o-': 8,
};

const Employee = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

  const fetchData = async () => {
    try {
      if (authToken) {
        const response = await axios.post("https://hrm.stackholic.io/api/employee/list", {}, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        });
        const data = response.data.data || [];
        console.log(data);
        setEmployeeList(data);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authToken?.token]);

  // for dialog box
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // ** States
  // const [language, setLanguage] = useState([])
  // const [date, setDate] = useState(null)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  // const handleSelectChange = event => {
  //   setLanguage(event.target.value)
  // }

  // form validation
  const initialFormValue = {
    user_name: "",
    password: "",
    email: "",
    phone_no: "",
    alternative_phone: "",
    address: "",
    designation: "",
    joining_date: "",
    birth_date: "",
    gender: "",
    blood_group: "",
    role: "",
    status: "",
    showPassword: false,
    gov_doc: '' // To store the selected image
  };

  const [formData, setFormData] = useState(initialFormValue);
  const [errors, setErrors] = useState(initialFormValue);

  const [employeeData, setEmployeeData] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  // Validation function for each field
  const validateName = (value) => {
    if (value.trim() === "") {
      return "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      return "Name should contain only characters";
    } else {
      return "";
    }
  };

  const validatePassword = (value) => {
    if (value === "") {
      return "Password is required"
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)) {
      return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    } else {
      return "";
    }
  }

  const validateEmail = (value) => {
    if (value.trim() === "") {
      return "Email Address is required";
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(value)) {
      return "Invalid email address";
    } else {
      return "";
    }
  };

  const validateNumber = (value) => {
    if (value.trim() === "") {
      return "Mobile number is required";
    } else if (!/^\d{10}$/.test(value)) {
      return "Mobile Number must be a 10-digit number";
    } else {
      return "";
    }
  };

  const validateAddress = (value) => {
    if (value.trim() === "") {
      return "Address is required";
    } else {
      return "";
    }
  };

  const validateDes = (value) => {
    if (value.trim() === "") {
      return "Designation is required";
    } else {
      return "";
    }
  };

  const validateJoinDate = (value) => {
    if (value.trim() === "") {
      return "Joining date is required";
    } else {
      return "";
    }
  };

  const validateBirDate = (value) => {
    if (value.trim() === "") {
      return "Birth date is required";
    } else {
      return "";
    }
  };

  const validateBGroup = (value) => {
    if (value.trim() === "") {
      return "Blood Group is required";
    } else if (!bloodGroupMapping[value.trim().toLowerCase()]) {
      return "Invalid Blood Group";
    } else {
      return "";
    }
  };

  const validateGender = (value) => {
    if (value === "" || value === "select gender") {
      return "Gender is required";
    } else {
      return "";
    }
  };

  const validateRole = (value) => {
    if (value.trim() === "") {
      return "Role is required";
    } else if (!roleMapping[value.trim().toLowerCase()]) {
      return "Invalid role";
    } else {
      return "";
    }
  };

  const validateStatus = (value) => {
    if (value.trim() === "") {
      return "Status is required";
    } else if (!statusMapping[value.trim().toLowerCase()]) {
      return "Invalid Status";
    } else {
      return "";
    }
  };

  const validateForm = () => {
    // Validate all form fields and set the error messages
    const newErrors = {
      user_name: validateName(formData.user_name),
      password: validatePassword(formData.password),
      email: validateEmail(formData.email),
      phone_no: validateNumber(formData.phone_no),
      address: validateAddress(formData.address),
      designation: validateDes(formData.designation),
      joining_date: validateJoinDate(formData.joining_date),
      birth_date: validateBirDate(formData.birth_date),
      gender: validateGender(formData.gender),
      blood_group: validateBGroup(formData.blood_group),
      role: validateRole(formData.role),
      status: validateStatus(formData.status),
    };

    setErrors(newErrors);

    // Check if the form is valid by checking if there are no error messages
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the current field and set the error message
    let error = "";
    if (name === "user_name") {
      error = validateName(value);
    } else if (name === "password") {
      error = validatePassword(value);
    } else if (name === "email") {
      error = validateEmail(value);
    } else if (name === "phone_no") {
      error = validateNumber(value);
    } else if (name === "address") {
      error = validateAddress(value);
    } else if (name === "designation") {
      error = validateDes(value);
    } else if (name === "joining_date") {
      error = validateJoinDate(value);
    } else if (name === "birth_date") {
      error = validateBirDate(value);
    } else if (name === "gender") {
      error = validateGender(value);
    } else if (name === "blood_group") {
      error = validateBGroup(value);
    } else if (name === "role") {
      error = validateRole(value);
    } else if (name === "status") {
      error = validateStatus(value);
    }

    // Set the error for the current field
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleImageChange = (files) => {
    setFormData({
      ...formData,
      gov_doc: files[0] // Store the selected image
    });
  };

  useEffect(() => {
    const selectedEmployee = employeeData.find(
      (employee) => employee.id === editEmployeeId
    );

    if (selectedEmployee) {
      setFormData(selectedEmployee);
    } else {
      setFormData({
        ...initialFormValue
      });
    }
  }, [editEmployeeId, employeeData]);

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
    setIsEditModalOpen(false);
  };

  const isInEditMode = !!editEmployeeId; // Check if editEmployeeEmail exists

  //  add ,update adn delete employee
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [maxId, setMaxId] = useState(0);

  // Helper function to handle unexpected mappings
  const getMappedValue = (value, mapping) => mapping[value.trim().toLowerCase()] || value;

  const handleEditButtonClick = (id) => {
    setEditEmployeeId(id);
    setIsEditModalOpen(true);
  };

  const addEmployee = async (newEmployee) => {
    try {
      const roleNumericValue = getMappedValue(newEmployee.role, roleMapping);
      const genderNumericValue = getMappedValue(newEmployee.gender, genderMapping);
      const statusNumericValue = getMappedValue(newEmployee.status, statusMapping);
      const bloodGroupNumericValue = getMappedValue(newEmployee.blood_group, bloodGroupMapping);

      const response = await axios.post("https://hrm.stackholic.io/api/employee/store", {
        ...newEmployee,
        role: roleNumericValue,
        status: statusNumericValue,
        gender: genderNumericValue,
        blood_group: bloodGroupNumericValue
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken.token}`,
        },
      });

      // Check the success status from the API response
      if (response.data.success) {
        // Instead of relying on the previous state, you can use the response data directly
        const addedEmployee = response.data;
        setEmployeeData((prevData) => [...prevData, addedEmployee]);
        setMaxId((prevMaxId) => prevMaxId + 1);
        setIsEditModalOpen(false);

        fetchData();
      } else {
        console.error("Error editing employee:", response.data.message);
      }
    } catch (error) {
      console.error("Error Adding Employee:", error);
    }
  };

  const editEmployee = async (editedEmployee, id) => {
    console.log(id)
    try {
      // if (!authToken || !authToken.token) {
      //   console.error("Authentication token not found.");
      //   return;
      // }

      const response = await axios.post(`https://hrm.stackholic.io/api/employee/store`, {
        editedEmployee,
        id
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.token}`,
        },
      });

      // Check the success status from the API response
      if (response.data.success) {
        // Update the local state to reflect the changes
        const updatedData = employeeData.map((employee) =>
          employee.id === editedEmployee.id ? editedEmployee : employee
        );
        setEmployeeData(updatedData);
        setEditEmployeeId(null); // Reset the edit state
      } else {
        console.error("Error editing employee:", response.data.message);
      }
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      // if (!authToken || !authToken.token) {
      //   console.error("Authentication token not found.");
      //   return;
      // }

      const response = await axios.post("https://hrm.stackholic.io/api/employee/delete", {
        id
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.token}`,
        },
      });

      // Check the success status from the API response
      if (response.data.success) {
        // Update the local state to reflect the deletion
        const updatedData = employeeData.filter(
          (employee) => employee.id !== id
        );
        setEmployeeData(updatedData);
      } else {
        console.error("Error deleting employee:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <>
      <Button variant='contained' onClick={handleClickOpen('body')}>Add Employees</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant='h6' fontWeight={600}>{isInEditMode ? 'Edit Employee' : 'Add Employee'}</Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <form onSubmit={handleFormSubmit}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    <TextField fullWidth label='Name'
                      id="user_name"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                    />
                    {errors.user_name && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.user_name}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
                      <OutlinedInput
                        label='Password'
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        type={values.showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              aria-label='toggle password visibility'
                            >
                              {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {errors.password && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.password}</Typography>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth type='email' label='Email' id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange} />
                    {errors.email && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.email}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Address' id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange} />
                    {errors.address && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.address}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Designation' id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange} />
                    {errors.designation && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.designation}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Mobile No.' id="phone_no"
                      name="phone_no"
                      maxLength={10}
                      value={formData.phone_no}
                      onChange={handleInputChange} />
                    {errors.phone_no && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.phone_no}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Alternative No.' id="alternative_phone"
                      name="alternative_phone"
                      maxLength="10"
                      value={formData.alternative_phone}
                      onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Birth Date' id="birth_date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleInputChange} />
                    {errors.birth_date && <Typography sx={{ color: "red", fontSize: "13px", fontWeight: "lighter", pt: 1 }}>{errors.birth_date}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Joining Date' id="joining_date"
                      name="joining_date"
                      value={formData.joining_date}
                      onChange={handleInputChange} />
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
                    <TextField fullWidth type="file" id="gov_doc" value={formData.gov_doc}
                      name="gov_doc" onChange={handleImageChange} />
                  </Grid>

                  {/* <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-multiple-select-label'>Language</InputLabel>
                      <Select
                        multiple
                        value={language}
                        onChange={handleSelectChange}
                        id='form-layouts-separator-multiple-select'
                        labelId='form-layouts-separator-multiple-select-label'
                        input={<OutlinedInput label='Language' id='select-multiple-language' />}
                      >
                        <MenuItem value='English'>English</MenuItem>
                        <MenuItem value='French'>French</MenuItem>
                        <MenuItem value='Spanish'>Spanish</MenuItem>
                        <MenuItem value='Portuguese'>Portuguese</MenuItem>
                        <MenuItem value='Italian'>Italian</MenuItem>
                        <MenuItem value='German'>German</MenuItem>
                        <MenuItem value='Arabic'>Arabic</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid> */}
                  {/* <Grid item xs={12} sm={6}>
                    <DatePicker
                      selected={date}
                      showYearDropdown
                      showMonthDropdown
                      placeholderText='MM-DD-YYYY'
                      customInput={<CustomInput />}
                      id='form-layouts-separator-date'
                      onChange={date => setDate(date)}
                    />
                  </Grid> */}
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
        </DialogContent>
      </Dialog>

      <Card sx={{ mt: 3 }}>
        <TableStickyHeader employeeList={employeeList} />
      </Card>
    </>
  )
}

export default Employee;
