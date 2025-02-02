import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
    </>
  );
}

export default App;
