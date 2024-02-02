import React from 'react';
import { Card } from '@mui/material';
import ProjectModal from 'src/components/ProjectModal/ProjectModal';
import useProjectData from 'src/hooks/useProjectData';
import { motion } from "framer-motion";
import ProjectTable from '../../views/projects/ProjectTable';

const Project = () => {
  const { projectData, editProjectId, open, setOpen, scroll, handleClickOpen, handleClose, deleteProjects, handleEdit, addProjects, editProjects, updateProjectStatus } = useProjectData();

  return (
    <>
      <ProjectModal editProjectId={editProjectId} projectData={projectData} open={open} setOpen={setOpen} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} addProjects={addProjects} editProjects={editProjects} />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <ProjectTable
            projectData={projectData}
            updateProjectStatus={updateProjectStatus}
            deleteProjects={deleteProjects}
            handleEdit={handleEdit}
          />
        </Card>
      </motion.div>
    </>
  )
}

export default Project;