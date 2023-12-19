import React, { useState } from 'react';
import { Box, Card } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import ListStatus from 'mdi-material-ui/ListStatus'
import ScaleBalance from 'mdi-material-ui/ScaleBalance'
import ApplicationImport from 'mdi-material-ui/ApplicationImport'
import LeaveRequest from 'src/views/leave/LeaveRequest';
import LeaveBalance from 'src/views/leave/LeaveBalance';
import LeaveType from 'src/views/leave/LeaveType';

const LeaveManagement = () => {
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

  // Remove karvanu che employee api aave aatle
  const authTokenEmp = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('employee-details')) : null;
  const roleEmp = authTokenEmp?.roles;

  const [value, setValue] = useState(() => {
    if (roleEmp === "Employee") {
      return 'leave-balance';
    } else {
      return 'leave-request';
    }
  });

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
            {roleEmp === "Employee" ? null : (
              <Tab
                value='leave-request'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ApplicationImport />
                    <TabName>All Leave Request</TabName>
                  </Box>
                }
              />
            )}
            <Tab
              value='leave-balance'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ScaleBalance />
                  <TabName>Leave Balance</TabName>
                </Box>
              }
            />
            {roleEmp === "Employee" ? null : (
              <Tab
                value='leave-type'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ListStatus />
                    <TabName>Leave Type</TabName>
                  </Box>
                }
              />
            )}
          </TabList>
        </Card>

        {roleEmp === "Employee" ? null : (
          <TabPanel sx={{ p: 0 }} value='leave-request'>
            <LeaveRequest />
          </TabPanel>
        )}
        <TabPanel sx={{ p: 0 }} value='leave-balance'>
          <LeaveBalance />
        </TabPanel>
        {roleEmp === "Employee" ? null : (
          <TabPanel sx={{ p: 0 }} value='leave-type'>
            <LeaveType />
          </TabPanel>
        )}
      </TabContext>
    </>
  )
}

export default LeaveManagement;