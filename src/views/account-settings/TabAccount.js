import { useState } from 'react'
import { Box, Grid, Link, Alert, Select, MenuItem, TextField, Typography, InputLabel, AlertTitle, IconButton, CardContent, FormControl, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import Close from 'mdi-material-ui/Close'
import Divider from '@mui/material/Divider'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  // const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  // const [editMode, setEditMode] = useState(false); // Add editMode state

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

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
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

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

export default TabAccount