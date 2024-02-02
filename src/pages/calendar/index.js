import { Box, Button, Card, CardContent, Container, Divider } from "@mui/material";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddEventModal from "src/components/CalendarModal/AddEventModal";
import AddTodoModal from "src/components/CalendarModal/AddTodoModal";
import EventInfo from "src/components/CalendarModal/EventInfo";
import EventInfoModal from "src/components/CalendarModal/EventInfoModal";
import enIN from "date-fns/locale/en-IN";
import AddDatePickerEventModal from "src/components/CalendarModal/AddDatePickerEventModal";
import CustomToolbar from "src/components/CalendarModal/CustomToolbar";
import { motion } from "framer-motion";
import useCalendarData from "src/hooks/useCalendarData";

const locales = {
  "en-IN": enIN,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const EventCalendar = () => {
  const { openSlot, openDatepickerModal, openTodoModal, setOpenTodoModal, eventInfoModal, todos, setTodos, scroll, handleSelectSlot, handleSelectEvent, onAddEvent, onAddEventFromDatePicker, onDeleteEvent, onEditEvent, dayPropGetter, handleNavigate, handleClose, eventFormData, setEventFormData, currentEvent, editedEventData, handleDatePickerClose, datePickerEventFormData, setDatePickerEventFormData, events, generateId, setOpenDatepickerModal } = useCalendarData();

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1 }}
    >
      <Container maxWidth={false} sx={{ pl: 0, pr: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exist={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
        >
          <Card sx={{ pt: 0 }}>
            <CardContent>
              <Box sx={{ display: "flex" }}>
                <Button
                  component={motion.div}
                  whileHover={{
                    scale: 0.9,
                    transition: { duration: 0.4 }
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exist={{ opacity: 0, y: 15 }}
                  transition={{ delay: 0.25 }}
                  sx={{ mr: 3 }}
                  variant='contained'
                  onClick={() => setOpenDatepickerModal(true)}
                >
                  Add Event
                </Button>
                <Button
                  component={motion.div}
                  whileHover={{
                    scale: 0.9,
                    transition: { duration: 0.4 }
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exist={{ opacity: 0, y: 15 }}
                  transition={{ delay: 0.25 }}
                  variant='contained'
                  onClick={() => setOpenTodoModal(true)}
                >
                  Create todo
                </Button>
              </Box>
              <Divider style={{ margin: 10 }} />
              {/* Remaining components and JSX for modals and Calendar */}
              <AddEventModal
                open={openSlot}
                handleClose={handleClose}
                eventFormData={eventFormData}
                setEventFormData={setEventFormData}
                onAddEvent={onAddEvent}
                editedEvent={currentEvent}
                todos={todos}
                scroll={scroll}
                editedEventData={editedEventData}
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
                onEditEvent={onEditEvent}
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
                components={{ event: EventInfo, toolbar: CustomToolbar }}
                dayPropGetter={dayPropGetter} // Add the dayPropGetter prop
                onNavigate={handleNavigate} // Add the onNavigate prop
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
                  height: 600,
                  width: "100%"
                }}
              />
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default EventCalendar;