import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function LinkList() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLinks = async () => {
    try {
      const res = await API.get("/api/links");
      setLinks(res.data);
    } catch (err) {
      setError("Failed to fetch links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const deleteLink = async (code) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;
    try {
      await API.delete(`/api/links/${code}`);
      setLinks((prev) => prev.filter((l) => l.code !== code));
    } catch (err) {
      alert("Failed to delete the link");
    }
  };

  if (loading) return <p>Loading links...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>All Links</h2>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Code</th>
            <th>URL</th>
            <th>Clicks</th>
            <th>Stats</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {links.map((l) => (
            <tr key={l.code}>
              <td>{l.code}</td>
              <td>{l.url}</td>
              <td>{l.clicks}</td>
              <td>
                <Link to={`/stats/${l.code}`}>View Stats</Link>
              </td>
              <td>
                <button onClick={() => deleteLink(l.code)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LinkList;
