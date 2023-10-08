import React, { useState } from "react";
import "./upload.css";
import { uploadFile } from "../../api.js";
import { frontendUrl } from "../../utils";

function Upload() {
  const [file, setFile] = useState(null);
  const [shortLink, setShortLink] = useState("");
  const [fileError, setFileError] = useState("");
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setError("");
      setPreviewUrl("");
      let maxSize; // 5mb

      if (selectedFile.type.startsWith("image/")) {
        maxSize = 4 * 1024 * 1024; // 4MB for JPG/JPEG/PNG
      } else if (selectedFile.type === "application/pdf") {
        maxSize = 1.5 * 1024 * 1024; // 1.5MB for PDF
      } else {
        // Unsupported file type
        setFile(null);
        setPreviewUrl("");
        setFileError("Unsupported file type.");
        return;
      }

      if (selectedFile.size <= maxSize) {
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
        setFileError("");
      } else {
        setFile(null);
        setFileError(
          "File size exceeds the maximum allowed size (1.5MB for pdf and 4mb for image)."
        );
      }
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    console.log(file);
    formData.append("file", file);
    alert("Please wait, File is uploading!")
    uploadFile(formData)
      .then((response) => {
        setShortLink(response.shortLink);
        setFileUrl(response.fileUrl);
        setError("");
        setFileError("");
        setPreviewUrl(null);
        alert("You may need to allow Popups to view the dowloadable files. Check the address bar for it!")
      })
      .catch((err) => {
        setError("Error uploading file.");
        setPreviewUrl(null);
        console.error(err);
      });
  };

  return (
    <div style={{ minHeight: "250px" }} className="container">
      <h2 style={{ marginBottom: "20px" }}>
        File Upload and Short Link Generation
      </h2>
      <div className="fileUpload">
        <div className="input">
          <label htmlFor="inputFile">
            <i class="fas fa-file-upload"></i>
            <input
              type="file"
              id="inputFile"
              onChange={handleFileChange}
              accept=".pdf, .jpg, .jpeg, .png"
            />
          </label>
          <p className="note">
            Upload File only in JPG/JPEG/PNG or PDF format.
            <br /> File size should not exceed 1.5 MB for PDF and 4 MB for Image
          </p>
        </div>

        <button style={{ marginBottom: "5px" }} onClick={handleUpload}>
          Upload
        </button>
      </div>
      {fileError && <p className="fileError">{fileError}</p>}
      {previewUrl && (
        <div>
          <h3>Preview</h3>
          {previewUrl.includes("pdf") ? (
            <iframe
              src={previewUrl}
              title="PDF Preview"
              className="pdfPreview"
            />
          ) : (
            <img src={previewUrl} alt="File Preview" className="imgPreview" />
          )}
        </div>
      )}

      {shortLink && fileUrl && (
        <>
          <button
            className="btn-download btn"
            onClick={() => {
              navigator.clipboard.writeText(`${frontendUrl}/${shortLink}`);
              alert("Link copied to clipboard");
            }}
          >
            Copy ShortURL
          </button>

          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <button className="btn-download btn">Download</button>
          </a>
        </>
      )}
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
}

export default Upload;
