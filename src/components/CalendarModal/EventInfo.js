import React from "react";
import { Typography } from "@mui/material";

const EventInfo = ({ event }) => {
    return (
        <>
            <Typography sx={{ color: "white" }}>{event.description}</Typography>
        </>
    );
};

export default EventInfo;