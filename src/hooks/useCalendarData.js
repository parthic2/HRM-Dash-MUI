import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const initialEventFormState = {
    description: "",
    todoId: undefined
};

const initialDatePickerEventFormData = {
    description: "",
    todoId: undefined,
    allDay: false,
    start: undefined,
    end: undefined,
};

const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString();

const useCalendarData = () => {
    const [openSlot, setOpenSlot] = useState(false);
    const [openDatepickerModal, setOpenDatepickerModal] = useState(false);
    const [openTodoModal, setOpenTodoModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [eventInfoModal, setEventInfoModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [editedEventData, setEditedEventData] = useState(null);
    const [todos, setTodos] = useState([]);
    const [eventFormData, setEventFormData] = useState(initialEventFormState);
    const [datePickerEventFormData, setDatePickerEventFormData] = useState(initialDatePickerEventFormData);
    const [scroll, setScroll] = useState('body');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const currentDate = new Date();

    // ** Hooks
    const theme = useTheme();

    useEffect(() => {
        // Load events from localStorage when component mounts
        const storedEvents = JSON.parse(localStorage.getItem("calenderEvents")) || [];
        setEvents(storedEvents);
    }, []);

    useEffect(() => {
        // Save events to localStorage whenever the events state changes
        localStorage.setItem("calenderEvents", JSON.stringify(events));
    }, [events]);

    const handleSelectSlot = (event, scrollType) => {
        setOpenSlot(true);
        setScroll(scrollType);
        setCurrentEvent(event);
    };

    const handleSelectEvent = (event) => {
        setCurrentEvent(event);
        setEventInfoModal(true);
    };

    const handleClose = () => {
        setEventFormData(initialEventFormState);
        setOpenSlot(false);
        setEditedEventData(null);
    };

    const handleDatePickerClose = () => {
        setDatePickerEventFormData(initialDatePickerEventFormData);
        setOpenDatepickerModal(false);
    };

    const onAddEvent = (e) => {
        e.preventDefault();

        if (editedEventData) {
            // If editedEventData is set, update the existing event
            const updatedEvents = events.map((event) =>
                event._id === editedEventData._id ? { ...event, ...eventFormData } : event
            );

            setEvents(updatedEvents);
            setEditedEventData(null);
            setEventFormData(initialEventFormState);
            setEventInfoModal(false);
        } else {
            // If not editing or editingEventData, add a new event
            const data = {
                ...eventFormData,
                _id: currentEvent?._id || generateId(),
                start: currentEvent?.start,
                end: currentEvent?.end,
            };

            const newEvents = [...events, data];
            setEvents(newEvents);
        }

        handleClose();
    };

    const onAddEventFromDatePicker = (e) => {
        e.preventDefault();

        const addHours = (date, hours) => {
            return date ? date.setHours(date.getHours() + hours) : undefined;
        };

        const setMinToZero = (date) => {
            date.setSeconds(0);

            return date;
        };

        const data = {
            ...datePickerEventFormData,
            _id: generateId(),
            start: setMinToZero(datePickerEventFormData.start),
            end: datePickerEventFormData.allDay
                ? addHours(datePickerEventFormData.start, 12)
                : setMinToZero(datePickerEventFormData.end),
        };

        const newEvents = [...events, data];

        setEvents(newEvents);
        setDatePickerEventFormData(initialDatePickerEventFormData);
        handleDatePickerClose();
    };

    const onDeleteEvent = () => {
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== currentEvent._id));
        setEventInfoModal(false);
    };

    const onEditEvent = (_id) => {
        setOpenSlot(true);
        const eventToEdit = events.find((event) => event._id === _id);
        if (eventToEdit) {
            setEditedEventData(eventToEdit);
            setEventFormData({
                _id: eventToEdit._id,
                description: eventToEdit.description,
                todoId: eventToEdit.todoId,
            });
        }
    };

    const dayPropGetter = (date) => {
        const isPrevMonth = date.getMonth() < currentMonth;
        const isNextMonth = date.getMonth() > currentMonth;
        const isCurrentDate = date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth();

        return {
            style: {
                backgroundColor: isPrevMonth || isNextMonth ? theme.palette.background.default : (isCurrentDate ? theme.palette.background.default : ""), // Set the desired background color
            },
        };
    };

    const handleNavigate = (date, view) => {
        // Update the currentMonth state when the user navigates to a different month
        setCurrentMonth(date.getMonth());
    };

    return {
        openSlot,
        openDatepickerModal,
        openTodoModal,
        setOpenTodoModal,
        eventInfoModal,
        todos,
        setTodos,
        scroll,
        handleSelectSlot,
        handleSelectEvent,
        onAddEvent,
        onAddEventFromDatePicker,
        onDeleteEvent,
        onEditEvent,
        dayPropGetter,
        handleNavigate,
        handleClose,
        eventFormData,
        setEventFormData,
        currentEvent,
        editedEventData,
        handleDatePickerClose,
        datePickerEventFormData,
        setDatePickerEventFormData,
        events,
        generateId,
        setOpenDatepickerModal
    }
}

export default useCalendarData