import React from 'react';
import Tracker from '../tracker';
import AttendanceTable from 'src/components/Attendance/AttendanceTable';
import { useTimer } from 'src/@core/context/TimerContext';

const Attendance = () => {
  const { projectsForCurrentMonth } = useTimer();
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
  const role = authToken?.role;

  return (
    <>
      {role === "HR" || role === "Employee" ? (
        <Tracker />
      ) : ""}

      <AttendanceTable savedProjects={projectsForCurrentMonth} />
    </>
  )
}

export default Attendance;