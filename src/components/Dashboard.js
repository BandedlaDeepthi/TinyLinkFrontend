import React, { useEffect, useState } from "react";
import CreateLinkForm from "./CreateLinkForm";
import LinkTable from "./LinkTable";

export default function Dashboard() {
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    const res = await fetch("http://localhost:8080/api/links");
    const data = await res.json();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div>
      <h2 className="title">Dashboard</h2>

      <CreateLinkForm onCreate={fetchLinks} />
      <LinkTable links={links} onDelete={fetchLinks} />
    </div>
  );
}
