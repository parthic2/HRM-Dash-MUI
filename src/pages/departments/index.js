import React, { useState } from 'react';
import { Card } from '@mui/material';
import useDepartmentData from 'src/hooks/useDepartmentData';
import DepartmentModal from 'src/components/DepartmentModal/DepartmentModal';
import { motion } from "framer-motion";
import DepartmentTable from '../../views/department/DepartmentTable';

const Department = () => {
  const { departmentData, editDepartId, open, setOpen, scroll, handleClickOpen, handleClose, addDepartments, updateDepartmentStatus } = useDepartmentData();

  return (
    <>
      <DepartmentModal editDepartId={editDepartId} departmentData={departmentData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} addDepartments={addDepartments} />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card sx={{ mt: 3 }}>
          <DepartmentTable
            departmentData={departmentData}
            updateDepartmentStatus={updateDepartmentStatus}
          />
        </Card>
      </motion.div>
    </>
  )
}

export default Department;