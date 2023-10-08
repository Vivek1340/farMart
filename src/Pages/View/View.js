import { useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { viewFile } from "../../api.js";
function View() {
  const { shortLink } = useParams();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    async function getImage() {
      alert("You may need to allow Popups to view the dowloadable files. Check the address bar for it!")
      const response = await viewFile(shortLink);
      if (response) {
        // window.location = response?.fileUrl;
        window.open(response?.fileUrl, "_blank");
        navigate("/profile/history");
      }
    }
    getImage();
  }, []);
  return;
}

export default View;
