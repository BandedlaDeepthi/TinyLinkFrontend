import React from "react";
import API from "../services/api";

export default function LinkTable({ links, onDelete }) {
  const deleteLink = async (code) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;

    try {
      await API.delete(`/api/links/${code}`);
      onDelete();
    } catch (err) {
      alert("Failed to delete the link");
    }
  };

  return (
    <div className="card">
      <h3>All Links</h3>

      <table>
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Clicks</th>
            <th>Last Clicked</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-text">No links created yet.</td>
            </tr>
          ) : (
            links.map((item) => {
              const shortUrl = `${process.env.REACT_APP_API_URL}/${item.code}`;
              return (
                <tr key={item.code}>
                  <td>
                    <a
                      className="code-link"
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {shortUrl}
                    </a>
                  </td>

                  <td className="truncate">{item.url}</td>
                  <td>{item.clicks}</td>
                  <td>{item.lastClicked || "—"}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteLink(item.code)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
