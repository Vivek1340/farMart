import { useState, useEffect } from "react";
import "./history.css";
import { getAllFiles, deleteFile } from "../../api";
import { frontendUrl } from "../../utils";

function History() {
  const [historyData, setHistoryData] = useState([]);
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  useEffect(() => {
    // Fetch history data from the backend based on the token
    // if (token) {
    //   fetchHistoryData(token);
    // } else {
    //   setHistoryData(false);
    fetchHistoryData(token);
    // }
  }, []);

  const fetchHistoryData = (token) => {
    // Make an API request to retrieve history data from the backend using Axios
    getAllFiles()
      .then((response) => {
        // Update the state with the retrieved history data
        console.log(response);
        setHistoryData(response);
      })
      .catch((error) => {
        console.error("Error fetching history data:", error);
        setHistoryData(false);
      });
  };

  const handleDelete = (id) => {
    try {
      deleteFile(id).then((response) => {
        console.log(response);
        setHistoryData((prev) => prev.filter((item) => item._id !== id));
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="boxHistory">
      {historyData.length > 0 ? (
        historyData.map((item, index) => (
          <div className="card">
            <p className="number"> {index + 1} </p>
            <p className="file"> {item.originalName.slice(0,20)}</p>
            <button
              className="btn-download btn"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${frontendUrl}/${item.shortLink}`
                );
                alert("Link copied to clipboard");
              }}
            >
              Copy ShortURL
            </button>

            <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
              <button className="btn-download btn">Download</button>
            </a>
            <button
              onClick={() => handleDelete(item._id)}
              className="btn-delete btn"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p> No history Found! </p>
      )}
    </div>
  );
}

export default History;
