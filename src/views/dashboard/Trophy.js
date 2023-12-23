import { Button, Card, Typography, CardContent } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles'
import { motion } from "framer-motion";

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = () => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  const variants = {
    hidden: { opacity: 0, x: -50, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
  }

  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "linear", delay: 0.20 }}
    >
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <Typography variant='h6'>Congratulations John! 🥳</Typography>
          <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
            Best seller of the month
          </Typography>
          <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
            $42.8k
          </Typography>
          <Button size='small' variant='contained'>
            View Sales
          </Button>
          <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
          <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
        </CardContent>
      </Card>
    </motion.main>
  )
}

export default Trophy;