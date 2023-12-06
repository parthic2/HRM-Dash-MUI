import { forwardRef, useState } from 'react';
import { Grid, Radio, Button, TextField, FormLabel, RadioGroup, CardContent, FormControl, FormControlLabel, Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const CustomInputJoin = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Joining Date' fullWidth {...props} />
})

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    marginRight: 0
  }
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

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down('sm')]: {
    display: "block",
    textAlign: "center",
  }
}))

const TypographyHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  lineHeight: 'normal',
  letterSpacing: '0.21px',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightBold
}))

const TabInfo = () => {
  // ** State
  const [date, setDate] = useState(null);
  const [dateJon, setDateJon] = useState(null);
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png');

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  };

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <BoxStyled>
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
            </BoxStyled>
          </Grid>
          <Divider
            textAlign='center'
            sx={{
              mt: 5,
              width: '100%',
              lineHeight: 'normal',
              textTransform: 'uppercase',
              '&:before, &:after': { top: 7, transform: 'none' },
            }}
          >
            <TypographyHeaderText noWrap>Personal Information</TypographyHeaderText>
          </Divider>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Bio'
              defaultValue='The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences.'
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth type='number' label='Employee ID' defaultValue='10' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Name' defaultValue='stack' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={date => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth type='email' label='Email' defaultValue='stack@stack.com' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Phone No' defaultValue='9878905434' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Address' defaultValue='surat' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Department' defaultValue='Development' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Designation' defaultValue='Front end Developer' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label='Salary' defaultValue='10000' />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePickerWrapper>
              <DatePicker
                selected={dateJon}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInputJoin />}
                onChange={date => setDateJon(date)}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row defaultValue='male' aria-label='gender' name='account-settings-info-radio'>
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Divider
            textAlign='center'
            sx={{
              mt: 5,
              width: '100%',
              lineHeight: 'normal',
              textTransform: 'uppercase',
              '&:before, &:after': { top: 7, transform: 'none' },
            }}
          >
            <TypographyHeaderText noWrap>Bank Detail</TypographyHeaderText>
          </Divider>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Account Holder Name' defaultValue='stack' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Account Number' defaultValue='1090909728762' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Bank Name' defaultValue='SBI' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Bank Identifier Code (IFSC Code)' defaultValue='5050' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Branch Location' defaultValue='surat' />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo;