import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../Assets/logo_dark.png";
import profile from "../../Assets/profile.png";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const [showProfile, setShowProfile] = useState(true);
const navigate = useNavigate()
  const handleMouseEnter = () => {
    setShowProfile(false);
  };

  const handleMouseLeave = () => {
    setShowProfile(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("profile");
navigate('/l;go')
  };

  return (
    <div className="containerHeader">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="box">
        <nav className="nav">
          <ul className="navList">
            <li
              className="navLink"
              onClick={() => {
                props.setActive("upload");
              }}
            >
              Upload
            </li>
            <li
              className="navLink"
              onClick={() => {
                props.setActive("history");
              }}
            >
              History
            </li>
          </ul>
        </nav>
        <div
          className="profile"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {showProfile ? (
            <img src={profile} alt="profile" className="profileImg" />
          ) : (
            <p className="signout" onClick={handleSignOut}>
              <Link to="/login">Sign Out</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
