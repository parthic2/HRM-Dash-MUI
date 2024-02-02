import React from 'react';
import { Card } from '@mui/material';
import useJobData from 'src/hooks/useJobData';
import JobModal from 'src/components/JobModal/JobModal';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import JobRequirementTable from './JobRequirementTable';

const JobRequirement = () => {
  const router = useRouter();
  const { jobData, editJobId, open, setOpen, scroll, handleClickOpen, handleClose, handleEdit, deleteJobs, addJobs, editJobs } = useJobData();

  return (
    <>
      {router.pathname === "/" ? "" :
        <JobModal editJobId={editJobId} jobData={jobData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} addJobs={addJobs} editJobs={editJobs} />
      }

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <JobRequirementTable
            jobData={jobData}
            router={router}
            deleteJobs={deleteJobs}
            handleEdit={handleEdit}
          />
        </Card>
      </motion.div>
    </>
  )
}

export default JobRequirement;