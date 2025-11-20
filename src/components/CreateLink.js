import { useState } from "react";
import API from "../services/api";

export default function CreateLink() {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [result, setResult] = useState(null);

  const create = async () => {
    try {
      const res = await API.post("/api/links", { url, customCode });

      setResult(res.data);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong";
      setResult({ error: errorMsg });
    }
  };

  return (
    <div>
      <h2>Create Short Link</h2>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br />

      <input
        type="text"
        placeholder="Custom code (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      />
      <br />

      <button onClick={create}>Create</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          {/* Error */}
          {result.error && (
            <p style={{ color: "red" }}>
              <b>Error:</b> {result.error}
            </p>
          )}

          {result.shortUrl && (
            <>
              <p><b>Short URL:</b></p>
              <a href={result.shortUrl} target="_blank" rel="noopener noreferrer">
                {result.shortUrl}
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
