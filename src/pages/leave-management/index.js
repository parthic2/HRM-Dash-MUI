import React, { useState } from 'react';
import { Box, Card } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import ListStatus from 'mdi-material-ui/ListStatus'
import ScaleBalance from 'mdi-material-ui/ScaleBalance'
import ApplicationImport from 'mdi-material-ui/ApplicationImport'
import LeaveRequest from 'src/views/leave/LeaveRequest/LeaveRequest';
import LeaveBalance from 'src/views/leave/LeaveBalance/LeaveBalance';
import LeaveType from 'src/views/leave/LeaveType/LeaveType';
import { motion } from "framer-motion";

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

  const [value, setValue] = useState('leave-request');

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
          <Card>
            <TabList
              onChange={handleChange}
              aria-label='account-settings tabs'
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Tab
                value='leave-request'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                    <ApplicationImport />
                    <TabName>{roleEmp === "Employee" ? "Leave Request" : "All Leave Request"}</TabName>
                  </Box>
                }
              />
              <Tab
                value='leave-balance'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                    <ScaleBalance />
                    <TabName>Leave Balance</TabName>
                  </Box>
                }
              />
              {roleEmp === "Employee" ? null : (
                <Tab
                  value='leave-type'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                      <ListStatus />
                      <TabName>Leave Type</TabName>
                    </Box>
                  }
                />
              )}
            </TabList>
          </Card>
        </motion.div>

        <TabPanel sx={{ p: 0, mt: 3 }} value='leave-request'>
          <LeaveRequest />
        </TabPanel>
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