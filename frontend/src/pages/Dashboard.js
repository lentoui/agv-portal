import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Dashboard() {

  const [data, setData] = useState({});

  useEffect(() => {

    fetch("http://https://your-ngrok-url.ngrok-free.app/dashboard")
      .then((res) => res.json())
      .then((result) => setData(result));

  }, []);

  return (

    <Layout>

      <h2 className="mb-4">
        Dashboard
      </h2>

      <div className="row">

        <div className="col-md-6">

          <div className="card p-4 text-center">

            <h5>Total Users</h5>
            <h2>{data.totalUsers}</h2>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card p-4 text-center">

            <h5>Total Companies</h5>
            <h2>{data.totalCompanies}</h2>

          </div>

        </div>

      </div>

    </Layout>

  );

}