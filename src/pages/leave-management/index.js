import React, { useState } from 'react';
import { Box, Card } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import ListStatus from 'mdi-material-ui/ListStatus'
import WalletOutline from 'mdi-material-ui/WalletOutline'
import ApplicationEditOutline from 'mdi-material-ui/ApplicationEditOutline'
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

  // ** State
  const [value, setValue] = useState('leave-request')

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
            <Tab
              value='leave-request'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ApplicationEditOutline />
                  <TabName>All Leave Request</TabName>
                </Box>
              }
            />
            <Tab
              value='leave-balance'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WalletOutline />
                  <TabName>Leave Balance</TabName>
                </Box>
              }
            />
            <Tab
              value='leave-type'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListStatus />
                  <TabName>Leave Type</TabName>
                </Box>
              }
            />
          </TabList>
        </Card>

        <TabPanel sx={{ p: 0 }} value='leave-request'>
          <LeaveRequest />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='leave-balance'>
          <LeaveBalance />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='leave-type'>
          <LeaveType />
        </TabPanel>
      </TabContext>
    </>
  )
}

export default LeaveManagement;