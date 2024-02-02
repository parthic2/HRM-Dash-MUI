import React from 'react';
import { Card } from '@mui/material';
import { motion } from "framer-motion";
import ApplicantListTable from './ApplicantListTable';

const ApplicantList = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exist={{ opacity: 0, y: 15 }}
      transition={{ delay: 0.25 }}
    >
      <Card sx={{ mt: 3 }}>
        <ApplicantListTable />
      </Card>
    </motion.div>
  )
}

export default ApplicantList;