import { useState, useContext } from "react";
// import axios from 'axios';
import AuthContext from "../../context/AuthProvider";
import { signUp } from "../../api.js";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const { setAuth } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const handleChange = (evt) => {
    const value = evt.target.value;
    setUser({
      ...user,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { name, email, password } = user;
    try {
      const response = await signUp(email, password, name);
      if (response) {
        localStorage.setItem("profile", JSON.stringify(response));
      }
      setAuth(response);
      navigate("/profile/upload");
      // Store the token securely (e.g., in cookies or local storage)
      // Redirect the user to a protected route or perform other actions
    } catch (error) {
      // Handle registration error (e.g., duplicate email)
      if (!error?.response) {
        setErrMsg("No server Response");
      } else {
        setErrMsg("Registration failed");
      }
    }

    for (const key in user) {
      setUser({
        ...user,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1 style={{margin:"7px"}}>Create Account</h1>
        {/* <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
        {errMsg && <p> {errMsg} </p>}
        <span style={{margin:"5px"}}>Use your email for registration</span>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          required  style={{borderRadius:"10px"}}
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required style={{borderRadius:"10px"}}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required style={{borderRadius:"10px"}}
        />
        <button style={{margin:"7px"}}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
