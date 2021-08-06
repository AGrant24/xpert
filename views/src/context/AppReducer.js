export default (state, action) => {
  switch (action.type) {
    case "GET_APPOINTMENTS":
      return {
        ...state, // what ever is in state
        loading: false, // set to false as appointments fetched
        appointments: action.payload, // starts as empty array and then filled with action.payload
      };
    case "DELETE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.filter(
          (appointment) => appointment._id !== action.payload
        ),
      };
    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
        /* how we have it in our state when we add new app new one comes in the payload 
          and gets put up top, when we fetch from the API its the other way around its 
          the most current at the end so we switch these here and have "...state.appointments" 
          then the new one "action.payload"  */
      };
    case "APPOINTMENT_ERROR":
      return {
        ...state,
        error: action.payload, // error filled with the payload that we sent
        // accessible within components if you want to create an alert
      };
    default:
      return state;
  }
};
