import React, { useEffect, useState } from "react";
import { axios } from "../../Server/Api";

const MySettings = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  

  useEffect(() => {
    axios
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setData(response?.data?.data));
  }, []);

  return <section>{data?.first_name}</section>;
};

export default MySettings;
