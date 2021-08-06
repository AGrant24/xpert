import React, { useEffect } from "react";
import LoginPage from "./components/LoginPage";
import Nav from "./components/Nav";
import { AppointmentList } from "./components/AppointmentList";
import { AddAppointment } from "./components/AddAppointment";
import { GlobalProvider } from "./context/GlobalState.js";

// Router
import { BrowserRouter as Router } from "react-router-dom";

// Login and Redux
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./redux/userSlice";

// Firebase/ Googleauth
import { auth } from "./firebase/firebase";

import "./styles/App.css";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // the user is logged in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {!user ? (
        <LoginPage />
      ) : (
        <GlobalProvider>
          <div className="nav-container">
            <Nav />
          </div>
          <div className="outer-container">
            <div className="card">
              <div className="container">
                <AppointmentList />
                <AddAppointment />
              </div>
            </div>
          </div>
        </GlobalProvider>
      )}
    </Router>
  );
}

export default App;
