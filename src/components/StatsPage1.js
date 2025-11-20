import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StatsPage() {
  const { code } = useParams();
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const res = await fetch(`http://localhost:8080/api/links/${code}`);
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="card">
      <h2>Stats for <span className="highlight">{code}</span></h2>

      <p><strong>Original URL:</strong> {stats.url}</p>
      <p><strong>Total Clicks:</strong> {stats.clicks}</p>
      <p><strong>Created At:</strong> {stats.createdAt}</p>
      <p><strong>Last Clicked:</strong> {stats.lastClicked || "Never"}</p>
    </div>
  );
}
