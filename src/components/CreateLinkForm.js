import React, { useState } from "react";
import API from "../services/api"; 

export default function CreateLinkForm({ onCreate }) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortLink, setShortLink] = useState("");

  const createLink = async () => {
    if (!url || url.trim() === "") {
      alert("Please enter a valid URL");
      return;
    }

    try {
      const res = await API.post("/api/links", { url, customCode });

      const fullShortUrl = `${process.env.REACT_APP_API_URL}/${res.data.code}`;
      setShortLink(fullShortUrl);

      setUrl("");
      setCustomCode("");
      onCreate();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong";

      if (errorMsg.includes("Custom code already used")) {
        const choice = window.confirm(
          "This custom code already exists.\n\nDo you want to generate a random code instead?"
        );

        if (choice) {
          return createRandomLink();
        } else {
          return;
        }
      }

      alert(errorMsg);
    }
  };

  const createRandomLink = async () => {
    try {
      const res = await API.post("/api/links", { url, customCode: "" });
      const fullShortUrl = `${process.env.REACT_APP_API_URL}/${res.data.code}`;
      setShortLink(fullShortUrl);

      setUrl("");
      setCustomCode("");
      onCreate();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong";
      alert(errorMsg);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortLink);
    alert("Short link copied!");
  };

  return (
    <div className="card">
      <h3>Create Short Link</h3>

      <input
        type="text"
        placeholder="Enter full URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        type="text"
        placeholder="Custom code (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      />

      <button onClick={createLink}>Create</button>

      {shortLink && (
        <div className="short-link-box">
          <p><b>Your Short Link:</b></p>
          <div className="short-link-row">
            <a href={shortLink} target="_blank" rel="noopener noreferrer">
              {shortLink}
            </a>
            <button onClick={copyToClipboard}>Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}
