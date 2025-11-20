import React, { useEffect, useState } from "react";
import API from "../services/api"; 

export default function HealthCheck() {
  const [status, setStatus] = useState("Checking...");

  const check = async () => {
    try {
      const res = await API.get("/healthz"); 
      setStatus(JSON.stringify(res.data, null, 2));
    } catch {
      setStatus("Server Down !");
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
