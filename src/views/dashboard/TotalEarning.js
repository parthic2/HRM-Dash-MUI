import { Box, Card, Avatar, Typography, IconButton, CardHeader, CardContent, LinearProgress } from '@mui/material';
import MenuUp from 'mdi-material-ui/MenuUp';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import { motion } from "framer-motion";

const data = [
  {
    progress: 75,
    imgHeight: 20,
    title: 'Zipcar',
    color: 'primary',
    amount: '$24,895.65',
    subtitle: 'Vuejs, React & HTML',
    imgSrc: '/images/cards/logo-zipcar.png'
  },
  {
    progress: 50,
    color: 'info',
    imgHeight: 27,
    title: 'Bitbank',
    amount: '$8,650.20',
    subtitle: 'Sketch, Figma & XD',
    imgSrc: '/images/cards/logo-bitbank.png'
  },
  {
    progress: 20,
    imgHeight: 20,
    title: 'Aviato',
    color: 'secondary',
    amount: '$1,245.80',
    subtitle: 'HTML & Angular',
    imgSrc: '/images/cards/logo-aviato.png'
  }
]

const TotalEarning = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.50 }}
    >
      <Card>
        <CardHeader
          title='Total Earning'
          titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
          action={
            <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
              <DotsVertical />
            </IconButton>
          }
        />
        <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
          <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
              $24,895
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
              <MenuUp sx={{ fontSize: '1.875rem', verticalAlign: 'middle' }} />
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'success.main' }}>
                10%
              </Typography>
            </Box>
          </Box>

          <Typography component='p' variant='caption' sx={{ mb: 10 }}>
            Compared to $84,325 last year
          </Typography>

          {data.map((item, index) => {
            return (
              <Box
                key={item.title}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ...(index !== data.length - 1 ? { mb: 8.5 } : {})
                }}
              >
                <Avatar
                  variant='rounded'
                  sx={{
                    mr: 3,
                    width: 40,
                    height: 40,
                    backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
                  }}
                >
                  <img src={item.imgSrc} alt={item.title} height={item.imgHeight} />
                </Avatar>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                      {item.title}
                    </Typography>
                    <Typography variant='caption'>{item.subtitle}</Typography>
                  </Box>

                  <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                      {item.amount}
                    </Typography>
                    <LinearProgress color={item.color} value={item.progress} variant='determinate' />
                  </Box>
                </Box>
              </Box>
            )
          })}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TotalEarning;