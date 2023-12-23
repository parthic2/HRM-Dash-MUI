import { Box, Card, Button, CardHeader, IconButton, Typography, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import { motion } from "framer-motion";

const WeeklyOverview = () => {
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.primary.main,
      theme.palette.background.default,
      theme.palette.background.default
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      tickPlacement: 'on',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`
      }
    }
  }

  const variants = {
    hidden: { opacity: 0, x: -50, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
  }

  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "linear", delay: 0.35 }}
    >
      <Card>
        <CardHeader
          title='Weekly Overview'
          titleTypographyProps={{
            sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
          }}
          action={
            <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
              <DotsVertical />
            </IconButton>
          }
        />
        <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
          <ReactApexcharts type='bar' height={205} options={options} series={[{ data: [37, 57, 45, 75, 57, 40, 65] }]} />
          <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h5' sx={{ mr: 4 }}>
              45%
            </Typography>
            <Typography variant='body2'>Your sales performance is 45% 😎 better compared to last month</Typography>
          </Box>
          <Button fullWidth variant='contained'>
            Details
          </Button>
        </CardContent>
      </Card>
    </motion.main>
  )
}

export default WeeklyOverview;