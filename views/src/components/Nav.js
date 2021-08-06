import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebase";
import { logout, selectUser } from "../redux/userSlice";
import Logo from "../styles/img/logo.png";

// Material UI
// import MenuIcon from "@material-ui/icons/Menu";
import { Avatar, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// Css
import "../styles/Nav.css";

function Nav() {
  // State
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [logoutMessage, setlogoutMessage] = useState(false);
  // Variables
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  return (
    <div className="nav">
      <div className="nav-left">
        <img src={Logo} alt="XPert" />
      </div>
      <div className="nav-middle"></div>
      <div className="tooltip-container">
        {logoutMessage && <div className="tooltip-message">Logout?</div>}
      </div>
      <div className="nav-right">
        <IconButton>
          <Avatar src={user?.photoUrl} />
        </IconButton>
        <IconButton>
          <ExitToAppIcon
            onClick={signOut}
            onMouseEnter={() => setlogoutMessage(true)}
            onMouseLeave={() => setlogoutMessage(false)}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default Nav;
