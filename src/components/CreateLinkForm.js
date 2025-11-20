import React, { useState } from "react";

export default function CreateLinkForm({ onCreate }) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortLink, setShortLink] = useState("");

  const createLink = async () => {
    // BUG FIX 1 – URL empty
    if (!url || url.trim() === "") {
      alert("Please enter a valid URL");
      return;
    }

    const res = await fetch("http://localhost:8080/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, customCode }),
    });

    // If backend returned an error
    if (!res.ok) {
      const errorData = await res.json();

      // BUG FIX 2 – Custom code exists
      if (
        errorData.error &&
        errorData.error.includes("Custom code already used")
      ) {
        const choice = window.confirm(
          "This custom code already exists.\n\nDo you want to generate a random code instead?"
        );

        if (choice) {
          return createRandomLink(); // -> call function below
        } else {
          return; // stop
        }
      }

      alert(errorData.error || "Something went wrong");
      return;
    }

    // On success
    const data = await res.json();
    const fullShortUrl = `http://localhost:8080/${data.code}`;
    setShortLink(fullShortUrl);

    setUrl("");
    setCustomCode("");

    onCreate();
  };

  const createRandomLink = async () => {
    const res = await fetch("http://localhost:8080/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, customCode: "" }),
    });

    const data = await res.json();
    const fullShortUrl = `http://localhost:8080/${data.code}`;
    setShortLink(fullShortUrl);

    setUrl("");
    setCustomCode("");

    onCreate();
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
