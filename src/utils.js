import jwtDecode from "jwt-decode";
export const checkUserIsValid = () => {
  const temp = JSON.parse(localStorage.getItem("profile"));
  if (temp?.token) {
    const decodedToken = jwtDecode(temp.token);
    console.log(decodedToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("profile");
      return false;
    } else {
      return true;
    }
  }
};


export const frontendUrl = "localhost:3000";