import { useTheme } from "@mui/material";

const CustomToolbar = (props) => {
  // ** Hooks
  const theme = useTheme();

  const styleButtons = {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    cursor: "pointer"
  }

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button
          type="button"
          style={styleButtons}
          onClick={() => props.onNavigate('TODAY')}
        >
          Today
        </button>
        <button
          type="button"
          style={styleButtons}
          onClick={() => props.onNavigate('PREV')}
        >
          Back
        </button>
        <button
          type="button"
          style={styleButtons}
          onClick={() => props.onNavigate('NEXT')}
        >
          Next
        </button>
      </span>
      <span className="rbc-toolbar-label" style={{ fontWeight: 700, fontSize: "18px" }}>{props.label}</span>
      <span className="rbc-btn-group">
        <button
          type="button"
          className=""
          style={styleButtons}
          onClick={() => props.onView('month')}
        >
          Month
        </button>
        {/* <button
            type="button"
            classNameName=""
            style={{ color: theme.palette.text.primary }}
            onClick={() => props.onView('week')}
          >
            Week
          </button> */}
        <button
          type="button"
          className=""
          style={styleButtons}
          onClick={() => props.onView('day')}
        >
          Day
        </button>
        <button
          type="button"
          className=""
          style={styleButtons}
          onClick={() => props.onView('agenda')}
        >
          Agenda
        </button>
      </span>
    </div>
  )
}

export default CustomToolbar;