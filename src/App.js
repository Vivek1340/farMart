import { useContext, useLayoutEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import "./App.css";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import View from "./Pages/View/View";
import { checkUserIsValid } from "./utils.js";

function App() {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  

  return (
    <div className="App">
      <Routes>

        <Route
          exact
          path="/profile/:isHistory"
          element={
          checkUserIsValid() ? <Profile /> : <Navigate to="/login" replace />
          }
        />
        <Route exact path="/login" element={checkUserIsValid() ? <Profile /> : <Login/>} />
        <Route
          path="/:shortLink"
          element={
            checkUserIsValid() ? <View /> : <Navigate to="/login" replace />
          }
        />
       <Route
        path="*"
        element={checkUserIsValid() ?<Navigate to="/profile/upload" replace/> : <Navigate to="/login" replace/>}
        />
      </Routes>
    </div>
  );
}

export default App;
