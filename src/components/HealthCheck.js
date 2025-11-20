import React, { useEffect, useState } from "react";

export default function HealthCheck() {
  const [status, setStatus] = useState("Checking...");

  const check = async () => {
    try {
      const res = await fetch("http://localhost:8080/healthz");
      const data = await res.json();
      setStatus(JSON.stringify(data, null, 2));
    } catch {
      setStatus("Server Down ❌");
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div className="card">
      <h2>System Health</h2>
      <pre className="health-box">{status}</pre>
    </div>
  );
}
