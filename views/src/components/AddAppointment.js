import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddAppointment = () => {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const { addAppointment } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: Math.floor(Math.random() * 100000000),
      text,
      time,
      date,
    };

    addAppointment(newAppointment);
  };

  return (
    <>
      <h3>Add New Appointment</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Name</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Name"
          />
        </div>
        <div className="form-control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="btn">Add Appointment</button>
      </form>
    </>
  );
};
