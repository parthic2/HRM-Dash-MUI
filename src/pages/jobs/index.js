import { useState } from 'react'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import ListStatus from 'mdi-material-ui/ListStatus'
import ApplicationEditOutline from 'mdi-material-ui/ApplicationEditOutline'
import JobRequirement from 'src/views/jobs/JobRequirement'
import ApplicantList from 'src/views/jobs/ApplicantList'

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

const Jobs = () => {
  // ** State
  const [value, setValue] = useState('requirement')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='requirement'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ApplicationEditOutline />
                <TabName>Requirement</TabName>
              </Box>
            }
          />
          <Tab
            value='applicant'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListStatus />
                <TabName>Applicant List</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='requirement'>
          <JobRequirement />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='applicant'>
          <ApplicantList />
        </TabPanel>
      </TabContext>
    </>
  )
}

export default Jobs