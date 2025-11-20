import React from "react";

export default function LinkTable({ links, onDelete }) {
  const deleteLink = async (code) => {
    await fetch(`http://localhost:8080/api/links/${code}`, {
      method: "DELETE",
    });
    onDelete();
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
              const shortUrl = `http://localhost:8080/${item.code}`;
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
