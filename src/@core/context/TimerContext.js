// context/TimerContext.js
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeElapsedInSeconds, setTimeElapsedInSeconds] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [roleWiseData, setRoleWiseData] = useState("");
  const [empRoleWiseData, setEmpRoleWiseData] = useState(""); // Remove karavnu che
  const [savedProjects, setSavedProjects] = useState([]); // To store saved project data
  const [showConfirm, setShowConfirm] = useState(false); // State to control the confirmation popup
  const [startTime, setStartTime] = useState(null);
  const [pauseTime, setPauseTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [userIP, setUserIP] = useState("");
  const SECONDS_IN_AN_HOUR = 3600;

  // Fetch data for login credential which role are login
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
  const role = authToken?.role;

  // Remove karvanu che employee api aave aatle
  const authTokenEmp = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('employee-details')) : null;
  const roleEmp = authTokenEmp?.roles;

  // Effect to handle timer updates
  useEffect(() => {
    let timeInterval;

    if (isTimerRunning) {
      timeInterval = setInterval(() => {
        setTimeElapsedInSeconds(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timeInterval);
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [isTimerRunning]);

  // Function to render time in HH:MM:SS format
  const renderTime = () => {
    const hours = Math.floor(timeElapsedInSeconds / SECONDS_IN_AN_HOUR);
    const minutes = Math.floor((timeElapsedInSeconds % SECONDS_IN_AN_HOUR) / 60);
    const seconds = Math.floor(timeElapsedInSeconds % 60);

    const paddedHours = hours < 10 ? `0${hours}` : hours;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  const time = renderTime();

  // Function to handle canceling the confirmation
  const onCancelConfirm = () => {
    setShowConfirm(false);
    setProjectName(""); // Clear the project name
    setDescription("");
  };

  // Function to start the timer
  const onStartTimer = () => {
    if (!isTimerRunning) {
      setShowConfirm(true);
    }

    // setShowProjectInput(true); // Show the project name input field
    if (projectName === "" || description === "") {
      setIsTimerRunning(false);
    } else {
      setIsTimerRunning(true);
      setShowConfirm(false);
    }
    setStartTime(new Date());
    setRoleWiseData(role);
    setEmpRoleWiseData(roleEmp);
  };

  // Function to pause the timer
  const onPauseTimer = () => {
    setIsTimerRunning(false);
    setPauseTime(new Date());
  }

  // Function to handle stopping the timer
  const onStopTimer = () => {
    if (isTimerRunning) {
      setShowConfirm(true);
    }
    setStopTime(new Date());
  };

  // Function to save the project and timer data
  const onSaveProject = () => {
    if (projectName && description && timeElapsedInSeconds > 0) {
      const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

      const hours = Math.floor(timeElapsedInSeconds / 3600);
      const minutes = Math.floor((timeElapsedInSeconds % 3600) / 60);
      const seconds = Math.floor(timeElapsedInSeconds % 60);

      const newProject = {
        projectName: projectName,
        description: description,
        role: role === "HR" ? roleWiseData : empRoleWiseData,
        startTime: startTime.toLocaleTimeString(),
        pauseTime: pauseTime ? pauseTime.toLocaleTimeString() : "",
        stopTime: stopTime.toLocaleTimeString(),
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };

      setSavedProjects(prevProjects => {
        return {
          ...prevProjects,
          [currentDate]: [...(prevProjects[currentDate] || []), newProject],
        };
      });

      // Save to localStorage
      const updatedProjects = {
        ...savedProjects,
        [currentDate]: [...(savedProjects[currentDate] || []), newProject],
      };
      localStorage.setItem('savedProjects', JSON.stringify(updatedProjects));

      setProjectName("");
      setDescription("");
      setTimeElapsedInSeconds(0);
      setShowConfirm(false);
      setIsTimerRunning(false);
      setStartTime(null);
      setPauseTime(null);
      setStopTime(null);
    }
  };

  useEffect(() => {
    const savedProjectsFromStorage = JSON.parse(localStorage.getItem('savedProjects'));

    if (savedProjectsFromStorage) {
      setSavedProjects(savedProjectsFromStorage);
    }
  }, []);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Current month (0-11)
  const currentYear = currentDate.getFullYear(); // Current year

  // Filter and gather all projects from the current month
  const projectsForCurrentMonth = [];
  Object.keys(savedProjects).forEach(date => {
    const projectDate = new Date(date);
    const projectMonth = projectDate.getMonth(); // Month of the saved project
    const projectYear = projectDate.getFullYear(); // Year of the saved project

    // Check if the saved project is from the current month and year
    if (projectMonth === currentMonth && projectYear === currentYear) {
      projectsForCurrentMonth.push(...savedProjects[date].map(project => ({ ...project, date })));
    }
  });

  // For getting the IP address of user PC
  useEffect(() => {
    // Function to fetch user's public IP address using ipify
    const fetchUserIP = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = response.data.ip;
        setUserIP(ipAddress);
        localStorage.setItem('userIP', ipAddress);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    // Call the function to fetch the IP address when the component mounts
    fetchUserIP();
  }, []);

  return (
    <TimerContext.Provider value={{
      isTimerRunning,
      setIsTimerRunning,
      onCancelConfirm,
      onStartTimer,
      onPauseTimer,
      onStopTimer,
      onSaveProject,
      showConfirm,
      time,
      savedProjects,
      projectName,
      setProjectName,
      description,
      setDescription,
      setShowConfirm,
      projectsForCurrentMonth,
      userIP,
      role,
      roleEmp
    }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}