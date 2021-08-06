import React, { useContext } from "react";
import Moment from "react-moment";
import { GlobalContext } from "../context/GlobalState.js";

// Material UI
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

export const Appointment = ({ appointment }) => {
  const { deleteAppointment } = useContext(GlobalContext);

  const displayDate = appointment.date;
  const displayTime = appointment.time;

  return (
    <li>
      <button
        onClick={() => deleteAppointment(appointment._id)}
        className="delete-btn"
      >
        <HighlightOffOutlinedIcon />
      </button>
      {appointment.text}
      <span>{displayTime}</span>
      <span>
        <Moment format="DD/MM/YYYY">{displayDate}</Moment>
      </span>
    </li>
  );
};
