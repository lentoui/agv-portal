import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Companies() {

  const [companies, setCompanies] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("client");

  useEffect(() => {

    fetch("http://127.0.0.1:3001/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data));

  }, []);

  const addCompany = async () => {

    await fetch("http://127.0.0.1:3001/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        type
      })
    });

    window.location.reload();

  };

  const deleteCompany = async (id) => {

    await fetch(`http://127.0.0.1:3001/companies/${id}`, {
      method: "DELETE"
    });

    setCompanies(companies.filter(c => c.id !== id));

  };

  return (
    <Layout>

      <h2 className="mb-4">
        Companies
      </h2>

      <div className="card p-3 mb-4">

        <div className="row g-2">

          <div className="col-md-5">

            <input
              className="form-control"
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          <div className="col-md-4">

            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >

              <option value="internal">
                Internal
              </option>

              <option value="client">
                Client
              </option>

            </select>

          </div>

          <div className="col-md-3">

            <button
              className="btn btn-success w-100"
              onClick={addCompany}
            >
              Add Company
            </button>

          </div>

        </div>

      </div>

      <div className="card p-3">

        <table className="table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {companies.map((company) => (

              <tr key={company.id}>

                <td>{company.name}</td>

                <td>{company.type}</td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCompany(company.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );

}