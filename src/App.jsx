import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
