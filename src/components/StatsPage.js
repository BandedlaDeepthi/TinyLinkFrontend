import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLink = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await API.get(`/api/links/${code}`);
        setLink(res.data);
      } catch (err) {
        setError("Link not found or server error");
        setLink(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [code]);

  if (loading) return <h2>Loading link stats...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  const formatDate = (dateStr) => {
    if (!dateStr) return "Never";
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div className="card">
      <h2>Stats for <code>{code}</code></h2>

      <div className="stats-item">
        <b>Original URL:</b>{" "}
        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
      </div>

      <div className="stats-item">
        <b>Clicks:</b> {link.clicks}
      </div>

      <div className="stats-item">
        <b>Last Clicked:</b> {formatDate(link.lastClicked)}
      </div>
    </div>
  );
}

export default StatsPage;
