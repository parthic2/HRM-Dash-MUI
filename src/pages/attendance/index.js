import React, { useState } from 'react';
import Tracker from '../tracker';
import AttendanceTable from 'src/components/Attendance/AttendanceTable';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { styled } from '@mui/material/styles';
import MuiTab from '@mui/material/Tab';
import { useTimer } from 'src/@core/context/TimerContext';
import { Box, Card, Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import Clock from 'mdi-material-ui/Clock';
import WalletOutline from 'mdi-material-ui/WalletOutline';
import RoleWiseAttendance from 'src/views/attendance/RoleWiseAttendance';

const Attendance = () => {
  const { projectsForCurrentMonth } = useTimer();
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
  const role = authToken?.role;

  const Tab = styled(MuiTab)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      minWidth: 100
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 67
    }
  }))

  const TabName = styled('span')(({ theme }) => ({
    lineHeight: 1.71,
    fontSize: '0.875rem',
    marginLeft: theme.spacing(2.4),
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }))

  // ** State
  const [value, setValue] = useState('role-attendance');

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <TabContext value={value}>
        <Card>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            {role === "HR" || role === "Employee" ? (
              <Tab
                value='tracker'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Clock />
                    <TabName>Tracker</TabName>
                  </Box>
                }
              />
            ) : ""}
            <Tab
              value='role-attendance'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WalletOutline />
                  <TabName>Role Wise Attendance</TabName>
                </Box>
              }
            />

            <FormControl sx={{ ml: 10, mt: 3, mb: 3, minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small-label">Select Role</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Select Role"
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
              </Select>
            </FormControl>
          </TabList>
        </Card>

        {role === "HR" || role === "Employee" ? (
          <TabPanel sx={{ p: 0 }} value='tracker'>
            <Tracker />
            <AttendanceTable savedProjects={projectsForCurrentMonth} />
          </TabPanel>
        ) : ""}
        <TabPanel sx={{ p: 0 }} value='role-attendance'>
          <RoleWiseAttendance />
        </TabPanel>
      </TabContext>
    </>
  )
}

export default Attendance;