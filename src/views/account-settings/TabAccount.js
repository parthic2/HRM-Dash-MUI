import { Grid, Typography, CardContent, Button } from '@mui/material';

const TabAccount = () => {
  // const [openAlert, setOpenAlert] = useState(true)
  // const [editMode, setEditMode] = useState(false); // Add editMode state

  // const handleEditClick = () => {
  //   setEditMode(true);
  // };

  // const handleSaveChanges = () => {
  //   // Handle save logic here
  //   setEditMode(false); // Set edit mode to false after saving changes
  // };

  return (
    <CardContent>
      {/* <Button variant='contained' onClick={handleEditClick}>Edit</Button> */}
      <form>
        <Grid container spacing={7}>
          <Grid item container spacing={2} sx={{ border: "1px solid rgba(58, 53, 65, 0.12)", paddingTop: "0 !important" }} ml={7} mt={7}>
            <Grid xs={4}>
              <Typography sx={{ fontWeight: 600, py: 3 }}>ID</Typography>
              <Typography sx={{ fontWeight: 600, py: 3 }}>Name</Typography>
              <Typography sx={{ fontWeight: 600, py: 3 }}>Email</Typography>
              <Typography sx={{ fontWeight: 600, py: 3 }}>Address</Typography>
              <Typography sx={{ fontWeight: 600, py: 3 }}>Designation</Typography>
              <Typography sx={{ fontWeight: 600, py: 3 }}>Mobile Number</Typography>
            </Grid>
            <Grid xs={6}>
              <Typography sx={{ py: 3 }}>90</Typography>
              <Typography sx={{ py: 3 }}>abc</Typography>
              <Typography sx={{ py: 3 }}>abc@gmail.com</Typography>
              <Typography sx={{ py: 3 }}>surat</Typography>
              <Typography sx={{ py: 3 }}>Front-end developer</Typography>
              <Typography sx={{ py: 3 }}>907868908</Typography>
            </Grid>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <TextField fullWidth label='ID' disabled={!editMode} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' disabled={!editMode} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='email' label='Email' disabled={!editMode} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Designation' disabled={!editMode} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Address' disabled={!editMode} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Mobile No.' disabled={!editMode} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={!editMode}>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='hr'>HR</MenuItem>
                <MenuItem value='employee'>Employee</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}


          {/* <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid> */}
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount;