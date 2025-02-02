import { axios } from "../../Server/Api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("phone_number", phoneNumber);
      formData.append("password", password);

      const res = await axios.post("/auth/signin", formData);

      if (res.data?.data?.tokens?.accessToken?.token) {
        toast.success("Login successful!"); // ✅ TO'G'RI JOYDA CHAQIRILDI
        localStorage.setItem("token", res.data.data.tokens.accessToken.token);
        navigate("/");
      } else {
        throw new Error("Token not found");
      }
    } catch (err) {
      toast.error("Error, please try again later."); // ✅ TO'G'RI JOYDA CHAQIRILDI
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-[100%]">
      <form className="w-[25%]" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="tel"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Phone Number
          </label>
          <input
            type="tel"
            id="tel"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="90 900 90 90"
            onChange={(evt) => setPhoneNumber(evt.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Password"
            onChange={(evt) => setPassword(evt.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default Login;
