import React from "react";

import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { auth, provider } from "../firebase/firebase";
import Logo from "../styles/img/logo.png";

// Css
import "../styles/Login.css";

// Material UI
// import { Button } from "@material-ui/core";

export default function LoginPage() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login-container">
        <img src={Logo} alt="XPert" />
        {/* <Button variant="contained" className="login-btn" onClick={signIn}>
          Login
        </Button> */}
        <button variant="contained" className="btn" onClick={signIn}>
          Login
        </button>
      </div>
    </div>
  );
}
