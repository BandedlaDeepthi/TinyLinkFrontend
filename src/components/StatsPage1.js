import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function StatsPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/links/${code}`);
      if (!res.ok) throw new Error("Link not found or server error");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [code]);

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString();
  };

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="card">
      <h2>Stats for <span className="highlight">{code}</span></h2>

      <p><strong>Original URL:</strong> <a href={stats.url} target="_blank" rel="noopener noreferrer">{stats.url}</a></p>
      <p><strong>Total Clicks:</strong> {stats.clicks}</p>
      <p><strong>Created At:</strong> {formatDate(stats.createdAt)}</p>
      <p><strong>Last Clicked:</strong> {formatDate(stats.lastClicked)}</p>

      <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
        &larr; Back
      </button>
    </div>
  );
}
