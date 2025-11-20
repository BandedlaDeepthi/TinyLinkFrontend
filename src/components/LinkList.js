import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function LinkList() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    API.get("/api/links").then((res) => setLinks(res.data));
  }, []);

  const deleteLink = async (code) => {
    await API.delete(`/api/links/${code}`);
    setLinks(links.filter((l) => l.code !== code));
  };

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