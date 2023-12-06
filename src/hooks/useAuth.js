import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const useAuth = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
    role: '',
  });

  const router = useRouter();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRadioChange = (event) => {
    setValues({ ...values, role: event.target.value });
  };

  // Remove karvanu che employee api aave aatle
  const handleEmployeeLogin = () => {
    if (!values.email || !values.password) {
      console.error("Email and password are required for employee login");

      return;
    }

    const employeeDetails = {
      email: values.email,
      password: values.password,
      roles: "Employee"
    };

    localStorage.setItem("employee-details", JSON.stringify(employeeDetails));

    router.push('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, role } = values;

    if (role === 'Employee') {
      handleEmployeeLogin();

      return;
    }

    try {
      const numericRole =
        role === 'HR'
          ? 1
          : role === 'Employee'
            ? 2
            : role === 'Admin'
              ? 3
              : 0;

      // Make a POST request to the login API
      const response = await axios.post('https://hrm.stackholic.io/api/login', {
        email,
        password,
        role: numericRole,
      });

      // Assuming your API returns a token upon successful login
      const loginDetails = {
        token: response.data.data.token,
        email: response.data.data.email,
        password: password, // Store the entered password if needed
        role: role,
      };

      // Store the token in localStorage or secure storage for future API requests
      localStorage.setItem('login-details', JSON.stringify(loginDetails));

      // Redirect the user after successful login
      const returnUrl = router.query.returnUrl || '/';
      router.push(returnUrl);
    } catch (error) {
      // Handle login failure
      console.error('Login failed', error);
    }
  };

  // Function to set default email based on selected role
  const setDefaultEmail = () => {
    if (values.role === 'Admin') {
      setValues({
        ...values,
        email: '14mscit050@gmail.com',
        password: 'H@min#5079',
      });
    } else if (values.role === 'HR') {
      setValues({
        ...values,
        email: 'stackholic@gmail.com',
        password: 'Stack@123',
      });
    } else {
      setValues({
        ...values,
        email: '',
        password: '',
      });
    }
  };

  // Call setDefaultEmail when the role changes
  useEffect(() => {
    setDefaultEmail();
  }, [values.role]);

  return {
    values,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleRadioChange,
    handleSubmit,
  };
};

export default useAuth;