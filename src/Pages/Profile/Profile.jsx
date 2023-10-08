import React, { useState, useLayoutEffect } from "react";
import "./profile.css";
import Upload from "../../Components/Upload/Upload";
import History from "../../Components/History/History";
import Header from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
function Profile() {
  const [active, setActive] = useState("upload");
  const { isHistory } = useParams();
  useLayoutEffect(() => {
    setActive(isHistory === "history" ? "history" : "upload");
  }, []);
  return (
    <div className="profileContainer">
      <div className="header">
        <Header setActive={setActive} />
      </div>
      <div className="content">
        {active === "upload" && <Upload />}
        {active === "history" && <History />}
      </div>
    </div>
  );
}

export default Profile;
