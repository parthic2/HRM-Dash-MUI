// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import { motion } from "framer-motion";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out'
}))

const LayoutAppBar = props => {
  // ** Props
  const { settings, verticalAppBarContent: userVerticalAppBarContent } = props

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const { contentWidth } = settings

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <AppBar elevation={0} className='layout-navbar' position='static'
        sx={{ borderBottom: "1px solid rgba(58, 53, 65, 0.12)" }}
      >
        {/* sx={{ backgroundColor: theme.palette.background.paper }} */}
        <Toolbar
          className='navbar-content-container'
          sx={{
            ...(contentWidth === 'boxed' && {
              '@media (min-width:1440px)': { maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)` }
            })
          }}
        >
          {(userVerticalAppBarContent && userVerticalAppBarContent(props)) || null}
        </Toolbar>
      </AppBar>
    </motion.div>
  )
}

export default LayoutAppBar;