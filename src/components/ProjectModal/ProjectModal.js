import { Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import ProjectForm from './ProjectForm';

const ProjectModal = ({ editProjectId, projectData, open, setOpen, scroll, handleClickOpen, handleClose }) => {
  // Remove karvanu che employee api aave aatle
  const authTokenEmp = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('employee-details')) : null;
  const roleEmp = authTokenEmp?.roles;

  return (
    <>
      {roleEmp === "Employee" ? null : (
        <Button variant='contained' onClick={handleClickOpen('body')}>Add Projects</Button>
      )}
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
          <ProjectForm handleClose={handleClose} editProjectId={editProjectId} projectData={projectData} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProjectModal;