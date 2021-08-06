import React, { useContext, useEffect } from "react";
import { Appointment } from "./Appointment";
import { GlobalContext } from "../context/GlobalState";

export const AppointmentList = () => {
  /* we are pulling out appointments as well as getAppointments from the state and its 
     async so we need to call it in the useEffect hook as any HTTP Request from a component 
     needs to be called in useEffect                                                        */
  const { appointments, getAppointments } = useContext(GlobalContext);

  /* Without putting an empty array after the below it will cause
     an infinate loop. This will fire off a warning in the 
     console so to disable this we add the comment below it       */
  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** The below makes a new array to sort the appointments by date first,
   *  then when they're mapped in the return they are sorted with
   *  next occuring appointment at the top
   */
  const myData = [].concat(appointments).sort(function (a, b) {
    let dateA = new Date(a.date),
      dateB = new Date(b.date);
    return dateA - dateB;
  });

  return (
    <>
      <h3>Upcoming</h3>
      <ul className="list">
        {myData.map((appointment) => (
          <Appointment
            key={appointment.id}
            appointment={appointment}
            date={appointment.date}
          />
        ))}
      </ul>
    </>
  );
};
