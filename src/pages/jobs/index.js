import { useState } from 'react'
import { Box, Card } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import FormatListBulletedTriangle from 'mdi-material-ui/FormatListBulletedTriangle'
import ApplicationEditOutline from 'mdi-material-ui/ApplicationEditOutline'
import JobRequirement from 'src/views/jobs/JobReuirement/JobRequirement'
import ApplicantList from 'src/views/jobs/ApplicantList/ApplicantList'
import { motion } from "framer-motion"

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
                value='requirement'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                    <ApplicationEditOutline />
                    <TabName>Requirement</TabName>
                  </Box>
                }
              />
              <Tab
                value='applicant'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                    <FormatListBulletedTriangle />
                    <TabName>Applicant List</TabName>
                  </Box>
                }
              />
            </TabList>
          </Card>
        </motion.div>

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