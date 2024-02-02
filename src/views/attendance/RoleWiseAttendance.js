import React, { useState } from 'react';
import { Card, Box, TextField, InputAdornment } from '@mui/material';
import { motion } from "framer-motion";
import { Magnify } from 'mdi-material-ui';
import RoleWiseAttendanceTable from './RoleWiseAttendanceTable';

const RoleWiseAttendance = () => {
  const [roleAttendance, setRoleAttendance] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // For Search data
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter data based on search query
  const filteredData = roleAttendance.filter((row) => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      row.employee_name.toLowerCase().includes(lowerCaseQuery) ||
      row.date.toLowerCase().includes(lowerCaseQuery) ||
      row.role.toLowerCase().includes(lowerCaseQuery) ||
      row.status.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exist={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.25 }}
    >
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 3 }}>
        <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
            size='small'
            placeholder='Search Here'
            onChange={handleSearch}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>
      <Card sx={{ mt: 3 }}>
        <RoleWiseAttendanceTable
          roleAttendance={roleAttendance}
          setRoleAttendance={setRoleAttendance}
          filteredData={filteredData}
        />
      </Card>
    </motion.div>
  )
}

export default RoleWiseAttendance;