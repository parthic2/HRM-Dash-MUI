import Link from 'next/link';
import { Radio, RadioGroup, Box, Button, Divider, TextField, InputLabel, Typography, IconButton, CardContent, FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import themeConfig from 'src/configs/themeConfig';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import useAuth from '../../../hooks/useAuth';
import { motion } from "framer-motion";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
}));

const LoginPage = () => {
  const { values, handleChange, handleClickShowPassword, handleMouseDownPassword, handleRadioChange, handleSubmit } = useAuth();

  return (
    <Box className='content-center'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important',
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Welcome to {themeConfig.templateName}! 👋🏻
              </Typography>
              <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
            </Box>
            <form noValidate autoComplete='off'>
              <TextField
                autoFocus
                fullWidth
                id='email'
                label='Email'
                sx={{ marginBottom: 4 }}
                value={values.email}
                onChange={handleChange('email')}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='auth-login-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl sx={{ mt: 2 }}>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  value={values.role}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel value='Admin' control={<Radio />} label='Admin' />
                  <FormControlLabel value='HR' control={<Radio />} label='HR' />
                  <FormControlLabel value='Employee' control={<Radio />} label='Employee' />
                </RadioGroup>
              </FormControl>
              <Button fullWidth size='large' variant='contained' sx={{ marginTop: 7 }} onClick={handleSubmit}>
                Login
              </Button>
              <Divider sx={{ my: 5 }} />
              <Box
                sx={{ m: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}
              >
                <Link passHref href='/'>
                  <LinkStyled onClick={(e) => e.preventDefault()}>Forgot Password?</LinkStyled>
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <FooterIllustrationsV1 />
    </Box>
  );
};

LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;