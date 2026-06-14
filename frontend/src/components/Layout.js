import Sidebar from "./Sidebar";

export default function Layout({ children }) {

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="container-fluid p-4 bg-light min-vh-100 page-transition">

        {children}

      </div>

    </div>

  );

}