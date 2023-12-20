import { useState } from "react";
import { Box, Button, ButtonGroup, Card, CardContent, Divider } from "@mui/material";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddEventModal from "src/components/CalendarModal/AddEventModal";
import AddDatePickerEventModal from "src/components/CalendarModal/AddDatePickerEventModal";
import AddTodoModal from "src/components/CalendarModal/AddTodoModal";
import EventInfo from "src/components/CalendarModal/EventInfo";
import EventInfoModal from "src/components/CalendarModal/EventInfoModal";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString();

const initialEventFormState = {
  description: "",
  todoId: undefined,
};

const initialDatePickerEventFormData = {
  description: "",
  todoId: undefined,
  allDay: false,
  start: undefined,
  end: undefined,
};

const EventCalendar = () => {
  const [openSlot, setOpenSlot] = useState(false);
  const [openDatepickerModal, setOpenDatepickerModal] = useState(false);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const [eventInfoModal, setEventInfoModal] = useState(false);

  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);

  const [eventFormData, setEventFormData] = useState(initialEventFormState);

  const [datePickerEventFormData, setDatePickerEventFormData] = useState(initialDatePickerEventFormData);

  const handleSelectSlot = (event) => {
    setOpenSlot(true);
    setCurrentEvent(event);
  };

  const handleSelectEvent = (event) => {
    setCurrentEvent(event);
    setEventInfoModal(true);
  };

  const handleClose = () => {
    setEventFormData(initialEventFormState);
    setOpenSlot(false);
  };

  const handleDatePickerClose = () => {
    setDatePickerEventFormData(initialDatePickerEventFormData);
    setOpenDatepickerModal(false);
  };

  const onAddEvent = (e) => {
    e.preventDefault();

    const data = {
      ...eventFormData,
      _id: generateId(),
      start: currentEvent?.start,
      end: currentEvent?.end,
    };

    const newEvents = [...events, data];

    setEvents(newEvents);
    handleClose();
  };

  const onAddEventFromDatePicker = (e) => {
    e.preventDefault();

    const addHours = (date, hours) => {
      return date ? date.setHours(date.getHours() + hours) : undefined;
    };

    const setMinToZero = (date) => {
      console.log(date);
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
  };

  const onDeleteEvent = () => {
    setEvents(() => [...events].filter((e) => e._id !== (currentEvent)._id));
    setEventInfoModal(false);
  };

  return (
    <Card sx={{ pt: 0 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
            <Button onClick={() => setOpenDatepickerModal(true)} size="small" variant="contained">
              Add event
            </Button>
            <Button onClick={() => setOpenTodoModal(true)} size="small" variant="contained">
              Create todo
            </Button>
          </ButtonGroup>
        </Box>
        <Divider style={{ margin: 10 }} />
        {/* Remaining components and JSX for modals and Calendar */}
        <AddEventModal
          open={openSlot}
          handleClose={handleClose}
          eventFormData={eventFormData}
          setEventFormData={setEventFormData}
          onAddEvent={onAddEvent}
          todos={todos}
        />

        <AddDatePickerEventModal
          open={openDatepickerModal}
          handleClose={handleDatePickerClose}
          datePickerEventFormData={datePickerEventFormData}
          setDatePickerEventFormData={setDatePickerEventFormData}
          onAddEvent={onAddEventFromDatePicker}
          todos={todos}
        />

        <AddTodoModal
          open={openTodoModal}
          handleClose={() => setOpenTodoModal(false)}
          todos={todos}
          setTodos={setTodos}
          generateId={generateId}
        />

        <EventInfoModal
          open={eventInfoModal}
          handleClose={() => setEventInfoModal(false)}
          onDeleteEvent={onDeleteEvent}
          currentEvent={currentEvent}
        />

        <Calendar
          localizer={localizer}
          events={events}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          components={{ event: EventInfo }}
          eventPropGetter={(event) => {
            const hasTodo = todos.find((todo) => todo._id === event.todoId)

            return {
              style: {
                backgroundColor: hasTodo ? hasTodo.color : "#b64fc8",
                borderColor: hasTodo ? hasTodo.color : "#b64fc8",
              },
            }
          }}
          style={{
            height: 700,
            width: "100%"
          }}
        />
      </CardContent>
    </Card>
  );
};

export default EventCalendar;