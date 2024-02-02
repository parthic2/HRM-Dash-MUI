import { Dialog, DialogContent, DialogTitle, Typography, Button, Box } from '@mui/material';
import ProjectForm from './ProjectForm';
import { motion } from "framer-motion";

const ProjectModal = ({ editProjectId, projectData, open, setOpen, scroll, handleClickOpen, handleClose, addProjects, editProjects }) => {

  // Remove karvanu che employee api aave aatle
  const authTokenEmp = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('employee-details')) : null;
  const roleEmp = authTokenEmp?.roles;

  return (
    <>
      <Box>
        {roleEmp === "Employee" ? null : (
          <Button
            sx={{ mb: 3 }}
            component={motion.div}
            whileHover={{
              scale: 0.9,
              transition: { duration: 0.4 }
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exist={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.25 }}
            variant='contained'
            onClick={handleClickOpen('body')}>
            Add Projects
          </Button>
        )}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant='h6' fontWeight={600}>
            {editProjectId ? 'Edit Projects' : 'Add Projects'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers={scroll === 'body'}>
          <ProjectForm handleClose={handleClose} editProjectId={editProjectId} projectData={projectData} setOpen={setOpen} addProjects={addProjects} editProjects={editProjects} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProjectModal;