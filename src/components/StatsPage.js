import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);

  useEffect(() => {
    API.get(`/api/links/${code}`)
      .then((res) => setLink(res.data))
      .catch(() => setLink(null));
  }, [code]);

  if (!link) return <h2>Link not found</h2>;

  return (
    <div>
      <h2>Stats for: {code}</h2>
      <p><b>URL:</b> {link.url}</p>
      <p><b>Clicks:</b> {link.clicks}</p>
      <p><b>Last Clicked:</b> {link.lastClicked}</p>
    </div>
  );
}

export default StatsPage;