import { Box, Card, Table, TableRow, TableHead, TableBody, TableCell, Typography, TableContainer } from '@mui/material';
import axios from 'axios';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';

const BirthdayMonthTable = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;

  useEffect(() => {
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

          // Filter employees with birthdays in the current month & year
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1;
          const currentYear = currentDate.getFullYear();

          const filteredData = data.filter(employee => {
            // Assuming the birth date is in the format "DD-MM-YYYY"
            const [day, month, year] = employee.birth_date.split("-");
            const birthMonth = parseInt(month, 10);
            const birthYear = parseInt(year, 10);

            return birthMonth === currentMonth && birthYear === currentYear;
          });

          setEmployeeData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exist={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.30 }}
    >
      <Card>
        <TableContainer sx={{ height: "250px" }}>
          <Table stickyHeader sx={{ minWidth: 370 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Birth Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData.map(row => (
                <TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.user_name}</Typography>
                      <Typography variant='caption'>{row.designation}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.birth_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </motion.div>
  )
}

export default BirthdayMonthTable;