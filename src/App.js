import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import StatsPage from "./components/StatsPage";
import HealthCheck from "./components/HealthCheck";
import StatsPage1 from "./components/StatsPage1";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<StatsPage />} />
          <Route path="/healthz" element={<HealthCheck />} />
        </Routes>
      </div>
    </Router>
  );
}
