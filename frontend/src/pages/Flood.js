import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Flood() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://https://your-ngrok-url.ngrok-free.app/flood")
        .then((res) => res.json())
        .then((result) => setData(result));
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <h2 className="mb-4">Flood Monitoring</h2>

      <div className="card shadow-sm p-4" style={{ maxWidth: "500px" }}>
        {data && (
          <>
            <p><strong>Location:</strong> {data.location}</p>
            <p><strong>Water Level:</strong> {data.waterLevel} m</p>
            <p><strong>Rainfall:</strong> {data.rainfall} mm</p>
            <p><strong>Status:</strong> {data.status}</p>
          </>
        )}
      </div>
    </Layout>
  );
}
