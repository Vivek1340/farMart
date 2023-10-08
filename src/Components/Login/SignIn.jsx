import { useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { signIn } from "../../api.js";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  // const { setAuth } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
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

    const { email, password } = user;
    try {
      const response = await signIn(email, password);
      if (response) {
        localStorage.setItem("profile", JSON.stringify(response));
      }
      
      navigate("/profile/upload");
      // Redirect the user to a protected route or perform other actions
    } catch (error) {
      // Handle login error (e.g., invalid credentials)
      if (error.response.data.message === "Invalid Credentials") {
        setErrMsg("Incorrect Password");
      } else if (error.response?.data?.status === 404) {
        setErrMsg(error.response.data.message);
      } else {
        setErrMsg("Login Failed");
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
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1 style={{margin:"7px"}}>Sign in</h1>
        {errMsg && <p>{errMsg}</p>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
          style={{borderRadius:"10px"}}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required style={{borderRadius:"10px"}}
        />
        {/* <a href="#">Forgot your password?</a> */}
        <button  style={{margin:"10px"}}>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
