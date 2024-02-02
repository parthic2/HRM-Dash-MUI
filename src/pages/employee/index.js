import React from 'react';
import { Card } from '@mui/material';
import useEmployeeData from 'src/hooks/useEmployeeData';
import EmployeeModal from 'src/components/EmployeeModal/EmployeeModal';
import { motion } from "framer-motion";
import EmployeeTable from '../../views/employee/EmployeeTable';

const Employee = () => {
  const { deleteEmployee, editEmployeeId, employeeData, open, setOpen, scroll, handleClickOpen, handleClose, updateEmployeeDesignation } = useEmployeeData();

  return (
    <>
      <EmployeeModal editEmployeeId={editEmployeeId} employeeData={employeeData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card sx={{ mt: 3 }}>
          <EmployeeTable
            employeeData={employeeData}
            updateEmployeeDesignation={updateEmployeeDesignation}
            deleteEmployee={deleteEmployee}
          />
        </Card>
      </motion.div>
    </>
  )
}

export default Employee;