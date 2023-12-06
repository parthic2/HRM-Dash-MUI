import { Box, Button, Card, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useTimer } from 'src/@core/context/TimerContext';
import ConfirmationModal from 'src/components/Attendance/ConfirmationModal';

const Tracker = () => {
  const { isTimerRunning, setIsTimerRunning, onCancelConfirm, onStartTimer, onPauseTimer, onStopTimer, onSaveProject, showConfirm, time, projectName, setProjectName, description, setDescription, setShowConfirm, userIP } = useTimer();

  const handleChange = (e) => {
    if (e.key === "Enter") {
      setIsTimerRunning(true); // Set isTimerRunning to true when a project is selected
      setShowConfirm(false); // Keep the dialog open to allow adding a description
    }
  };

  return (
    <>
      <Card sx={{ width: '100%', p: 5, mt: 5 }}>
        <Typography variant='h6' sx={{ textAlign: "center", fontWeight: 800 }}>{time}</Typography>
        <Typography variant='body2' color="primary" sx={{ textAlign: "center", fontWeight: 700 }}>Your IP Address: {userIP}</Typography>
        <Box sx={{ mt: 4, textAlign: "center" }} gap={3}>
          <Button
            variant='contained'
            onClick={onStartTimer}
            disabled={isTimerRunning}
            sx={{ m: 2 }}
            color="success"
          >
            Start
          </Button>
          <Button
            variant='contained'
            disabled={!isTimerRunning}
            onClick={onPauseTimer}
            color="secondary"
            sx={{ m: 2 }}
          >
            Pause
          </Button>
          <Button
            variant='contained'
            onClick={onStopTimer}
            disabled={!isTimerRunning}
            color="error"
            sx={{ m: 2 }}
          >
            Stop
          </Button>
        </Box>
      </Card>

      <ConfirmationModal
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        onSaveProject={onSaveProject}
        onCancelConfirm={onCancelConfirm}
        projectName={projectName}
        setProjectName={setProjectName}
        description={description}
        setDescription={setDescription}
        handleChange={handleChange}
        isTimerRunning={isTimerRunning}
      />
    </>
  )
}

export default Tracker;