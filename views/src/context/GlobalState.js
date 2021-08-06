import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  appointments: [],
  error: null, //errors in state can be used throughout state
  loading: true, // if still loading will show a spinner
  // set to false once loaded
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  // get
  // async because axios returns a promise and speaks to the database
  async function getAppointments() {
    try {
      const res = await axios.get("/api/v1/appointments"); // this gets from the server
      // Dont need to put the begining of the URL as we have put the proxy in the package json

      // res.data.data will go into the response then get the whole object then get the data
      // property from the object in the db
      // dispatch() dispatches and action, it changes the state using the useReducer hook
      dispatch({
        type: "GET_APPOINTMENTS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "APPOINTMENT_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteAppointment(id) {
    try {
      await axios.delete(`/api/v1/appointments/${id}`); // this deletes it from the server
      dispatch({
        type: "DELETE_APPOINTMENT",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "APPOINTMENT_ERROR",
        payload: err.res.data.error,
      });
    }

    dispatch({
      type: "DELETE_APPOINTMENT",
      payload: id,
    });
  }

  async function addAppointment(appointment) {
    // with sending data here we need a content type within the headers object below
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/appointments", appointment, config);
      // this adds to the server
      // second param here is what we are adding which is coming in from the param of this
      // async function and the 3rd param is the config that has the headers
      dispatch({
        type: "ADD_APPOINTMENT",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "APPOINTMENT_ERROR",
        payload: err.response.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        // We need to pass the functions here so we can actually use them in our GlobalContext
        appointments: state.appointments,
        error: state.error,
        loading: state.loading,
        getAppointments,
        deleteAppointment,
        addAppointment,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
