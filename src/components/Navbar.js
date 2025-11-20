import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="brand">TinyLink</div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/healthz">Health</Link>
      </div>
    </div>
  );
}
