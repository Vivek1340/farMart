import { useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { viewFile } from "../../api.js";
function View() {
  const { shortLink } = useParams();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    async function getImage() {
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
