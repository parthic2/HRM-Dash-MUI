import React, { useState } from 'react';
import Tracker from '../tracker';
import AttendanceTable from 'src/components/Attendance/AttendanceTable';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { styled } from '@mui/material/styles';
import MuiTab from '@mui/material/Tab';
import { Box, Card } from '@mui/material';
import Clock from 'mdi-material-ui/Clock';
import WalletOutline from 'mdi-material-ui/WalletOutline';
import RoleWiseAttendance from 'src/views/attendance/RoleWiseAttendance';
import { motion } from "framer-motion";

const Attendance = () => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
  const role = authToken?.role;

  // Remove karvanu che employee api aave aatle
  const authTokenEmp = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('employee-details')) : null;
  const roleEmp = authTokenEmp?.roles;

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
  const [value, setValue] = useState(() => {
    if (role === "HR" || roleEmp === "Employee") {
      return 'tracker';
    } else {
      return 'role-attendance';
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <TabContext value={value}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exist={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
        >
          <Card
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exist={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.25 }}
          >
            <TabList
              onChange={handleChange}
              aria-label='account-settings tabs'
            >
              {role === "HR" || roleEmp === "Employee" ? (
                <Tab
                  value='tracker'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                      <Clock />
                      <TabName>Tracker</TabName>
                    </Box>
                  }
                />
              ) : ""}
              {roleEmp === "Employee" ? null : (
                <Tab
                  value='role-attendance'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                      <WalletOutline />
                      <TabName>Role Wise Attendance</TabName>
                    </Box>
                  }
                />
              )}
            </TabList>
          </Card>
        </motion.div>

        {role === "HR" || roleEmp === "Employee" ? (
          <TabPanel sx={{ p: 0 }} value='tracker'>
            <Tracker />
            <AttendanceTable />
          </TabPanel>
        ) : ""}

        {!roleEmp === "Employee" ? null : (
          <TabPanel sx={{ p: 0 }} value='role-attendance'>
            <RoleWiseAttendance />
          </TabPanel>
        )}
      </TabContext>
    </>
  )
}

export default Attendance;