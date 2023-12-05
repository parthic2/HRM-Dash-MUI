import { Button, DialogContentText, Grid, Divider, TextField, Typography, CardContent, CardActions } from '@mui/material';
import { useEffect, useRef } from 'react';

const AwardsForm = () => {
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }, []);

  return (
    <>
      <DialogContentText
        id="scroll-dialog-description"
        ref={descriptionElementRef}
        tabIndex={-1}
      >
        <form autoComplete="off">
          <CardContent>
            <Grid container spacing={5}>
              form
            </Grid>
          </CardContent>
        </form>
      </DialogContentText>
    </>
  )
}

export default AwardsForm;