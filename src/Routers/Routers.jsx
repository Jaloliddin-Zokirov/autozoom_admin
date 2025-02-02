import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Components/Login/Login";
import Cars from "../Components/Cars/Cars";
import Models from "../Components/Models/Models";
import Categories from "../Components/Categories/Categories";
import Brands from "../Components/Brands/Brands";
import Locations from "../Components/Locations/Locations";
import Cities from "../Components/Cities/Cities";
import MySettings from "../Components/MySettings/MySettings";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      { path: "models", element: <Models /> },
      { path: "locations", element: <Locations /> },
      { path: "cities", element: <Cities /> },
      { path: "cars", element: <Cars /> },
      { path: "my-settings", element: <MySettings /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default Routers;
