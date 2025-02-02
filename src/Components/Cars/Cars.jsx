import React, { useEffect, useState } from "react";
import { axios } from "../../Server/Api";
import { toast } from "react-toastify";

const Cars = () => {
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [city, setCity] = useState(null);
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [editId, setEditId] = useState(null);
  const [create, setCreate] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  // Get Cars
  useEffect(() => {
    axios.get("/cars").then((response) => {
      setData(response?.data?.data);
    });
    axios.get("/brands").then((response) => {
      setBrand(response?.data?.data);
    });
    axios.get("/models").then((response) => {
      setModel(response?.data?.data);
    });
    axios.get("/cities").then((response) => {
      setCity(response?.data?.data);
    });
    axios.get("/categories").then((response) => {
      setCategory(response?.data?.data);
    });
    axios.get("/locations").then((response) => {
      setLocation(response?.data?.data);
    });
  }, [deleteId, editId, create]);

  // Add new Cars
  const handleAdd = async (evt) => {
    evt.preventDefault();
    setLoadingBtn(true);

    const formData = new FormData();
    formData.append("color", document.getElementById("color")?.value);
    formData.append("year", document.getElementById("year")?.value);
    formData.append("seconds", document.getElementById("seconds")?.value);
    formData.append("max_speed", document.getElementById("max_speed")?.value);
    formData.append("max_people", document.getElementById("max_people")?.value);
    formData.append(
      "transmission",
      document.getElementById("transmission")?.value
    );
    formData.append("motor", document.getElementById("motor")?.value);
    formData.append("drive_side", document.getElementById("drive_side")?.value);
    formData.append("petrol", document.getElementById("petrol")?.value);
    formData.append(
      "limitperday",
      document.getElementById("limitperday")?.value
    );
    formData.append("deposit", document.getElementById("deposit")?.value);
    formData.append(
      "premium_protection",
      document.getElementById("premium_protection")?.value
    );
    formData.append(
      "price_in_aed",
      document.getElementById("price_in_AED")?.value
    );
    formData.append(
      "price_in_usd",
      document.getElementById("price_in_USD")?.value
    );
    formData.append(
      "price_in_aed_sale",
      document.getElementById("price_in_AED_sale")?.value
    );
    formData.append(
      "price_in_usd_sale",
      document.getElementById("price_in_USD_sale")?.value
    );
    formData.append("inclusive", document.getElementById("inclusive")?.checked);
    formData.append("cover", document.getElementById("cover")?.files[0]);
    formData.append("brand_id", document.getElementById("brand")?.value);
    formData.append("model_id", document.getElementById("model")?.value);
    formData.append("city_id", document.getElementById("city")?.value);
    formData.append("category_id", document.getElementById("category")?.value);
    formData.append("location_id", document.getElementById("location")?.value);
    formData.append("images", document.getElementById("image")?.files[0]);
    formData.append("images", document.getElementById("image2")?.files[0]);

    try {
      const response = await axios.post("/cars", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Add successful");
      setCreate(null);
    } catch (error) {
      toast.error("Error, Please try again later");
    } finally {
      setLoadingBtn(false);
    }
  };

  // Edit Cars
  const handleEdit = async (evt) => {
    evt.preventDefault();
    setLoadingBtn(true);

    const formData = new FormData();
    formData.append("color", document.getElementById("color")?.value);
    formData.append("year", document.getElementById("year")?.value);
    formData.append("seconds", document.getElementById("seconds")?.value);
    formData.append("max_speed", document.getElementById("max_speed")?.value);
    formData.append("max_people", document.getElementById("max_people")?.value);
    formData.append(
      "transmission",
      document.getElementById("transmission")?.value
    );
    formData.append("motor", document.getElementById("motor")?.value);
    formData.append("drive_side", document.getElementById("drive_side")?.value);
    formData.append("petrol", document.getElementById("petrol")?.value);
    formData.append(
      "limitperday",
      document.getElementById("limitperday")?.value
    );
    formData.append("deposit", document.getElementById("deposit")?.value);
    formData.append(
      "premium_protection",
      document.getElementById("premium_protection")?.value
    );
    formData.append(
      "price_in_aed",
      document.getElementById("price_in_AED")?.value
    );
    formData.append(
      "price_in_usd",
      document.getElementById("price_in_USD")?.value
    );
    formData.append(
      "price_in_aed_sale",
      document.getElementById("price_in_AED_sale")?.value
    );
    formData.append(
      "price_in_usd_sale",
      document.getElementById("price_in_USD_sale")?.value
    );
    formData.append("inclusive", document.getElementById("inclusive")?.checked);
    formData.append("cover", document.getElementById("cover")?.files[0]);
    formData.append("brand_id", document.getElementById("brand")?.value);
    formData.append("model_id", document.getElementById("model")?.value);
    formData.append("city_id", document.getElementById("city")?.value);
    formData.append("category_id", document.getElementById("category")?.value);
    formData.append("location_id", document.getElementById("location")?.value);
    formData.append("images", document.getElementById("image")?.files[0]);
    formData.append("images", document.getElementById("image2")?.files[0]);

    try {
      const response = await axios.put(`/cars/${editId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setEditId(null);
      toast.success("Update successful");
    } catch (error) {
      toast.error("Error, Please try again later");
    } finally {
      setLoadingBtn(false);
    }
  };

  // Delete Cars
  const handleDelete = () => {
    setLoadingBtn(true);
    axios
      .delete(`/cars/${deleteId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Success to delete");
        setDeleteId(null);
      })
      .catch(() => {
        toast.error("Error, Please try again later");
      })
      .finally(() => {
        setLoadingBtn(false);
      });
  };

  useEffect(() => {
    if (!data) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-3xl">Cars</h2>
          <button
            onClick={() => setCreate("newCars")}
            type="button"
            className="cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add new Car
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3">
                  Model
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  City
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                  </td>
                </tr>
              )}
              {data?.map((el, index) => {
                return (
                  <tr
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    key={el.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {el.brand.title}
                    </th>
                    <td className="px-6 py-4">{el.model.name}</td>
                    <td className="px-6 py-4">{el.color}</td>
                    <td className="px-6 py-4">{el.city.name}</td>
                    <td className="px-6 py-4">
                      <div
                        className="inline-flex rounded-md shadow-xs"
                        role="group"
                      >
                        <button
                          onClick={() => setEditId(el.id)}
                          type="button"
                          className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-green-700 border border-green-200 rounded-s-lg hover:bg-green-100 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-700 focus:text-white dark:bg-green-800 dark:border-green-700 dark:text-white dark:hover:text-white dark:hover:bg-green-700 dark:focus:ring-green-500 dark:focus:text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(el.id)}
                          type="button"
                          className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-red-700 border border-red-200 rounded-e-lg hover:bg-red-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-white dark:bg-red-800 dark:border-red-700 dark:text-white dark:hover:text-white dark:hover:bg-red-700 dark:focus:ring-red-900 dark:focus:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {data?.length === 0 && (
            <div className="my-12 text-center">
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                className="mx-auto mb-8 w-2xs h-2xs"
                alt="img"
              />
              <p className="mb-4 text-sm font-medium text-gray-900">No Data</p>
              <button
                onClick={handleAdd}
                type="button"
                className="cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Create Now
              </button>
            </div>
          )}
        </div>

        {/* Main modal */}
        {(editId || create) && (
          <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative mx-auto top-[2%] p-4 w-full max-w-[1100px] max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {editId ? "Edit Cars" : "Add Cars"}
                  </h3>
                  <button
                    onClick={() => {
                      setEditId(null);
                      setCreate(null);
                    }}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form
                    className="space-y-4"
                    onSubmit={(evt) => {
                      evt.preventDefault();
                      if (editId) {
                        handleEdit(evt);
                      } else {
                        handleAdd(evt);
                      }
                    }}
                  >
                    <div className="flex flex-wrap gap-6">
                      <div>
                        <label
                          htmlFor="color"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Color
                        </label>
                        <input
                          type="text"
                          name="color"
                          id="color"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)?.color
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter Color"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="year"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Year
                        </label>
                        <input
                          type="number"
                          name="year"
                          id="year"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)?.year
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter year"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="seconds"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Seconds
                        </label>
                        <input
                          type="number"
                          name="seconds"
                          id="seconds"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.seconds
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter seconds"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="max_speed"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Max speed
                        </label>
                        <input
                          type="number"
                          name="max_speed"
                          id="max_speed"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.max_speed
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter max speed"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="max_people"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Max people
                        </label>
                        <input
                          type="number"
                          name="max_people"
                          id="max_people"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.max_people
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter max people"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="transmission"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Transmission
                        </label>
                        <input
                          type="text"
                          name="transmission"
                          id="transmission"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.transmission
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter transmission"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="motor"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Motor
                        </label>
                        <input
                          type="text"
                          name="motor"
                          id="motor"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)?.motor
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter Motor"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="drive_side"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Drive side
                        </label>
                        <input
                          type="text"
                          name="drive_side"
                          id="drive_side"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.drive_side
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter Drive side"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="petrol"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Petrol
                        </label>
                        <input
                          type="text"
                          name="petrol"
                          id="petrol"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)?.petrol
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter Petrol"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="limitperday"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Limitperday
                        </label>
                        <input
                          type="number"
                          name="limitperday"
                          id="limitperday"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.limitperday
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter Limitperday"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="deposit"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Deposit
                        </label>
                        <input
                          type="number"
                          name="deposit"
                          id="deposit"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.deposit
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter Deposit"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="premium_protection"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Premium protection
                        </label>
                        <input
                          type="number"
                          name="premium_protection"
                          id="premium_protection"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.premium_protection
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter Premium protection"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="price_in_AED"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price in AED
                        </label>
                        <input
                          type="number"
                          name="price_in_AED"
                          id="price_in_AED"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.price_in_aed
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter Price in AED"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="price_in_USD"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price in USD
                        </label>
                        <input
                          type="number"
                          name="price_in_USD"
                          id="price_in_USD"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.price_in_usd
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter Price in USD"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="price_in_AED_sale"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price in AED sale
                        </label>
                        <input
                          type="number"
                          name="price_in_AED_sale"
                          id="price_in_AED_sale"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.price_in_aed_sale
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter Price in AED sale"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="price_in_USD_sale"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price in USD sale
                        </label>
                        <input
                          type="number"
                          name="price_in_USD_sale"
                          id="price_in_USD_sale"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.price_in_usd_sale
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter Price in USD sale"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="inclusive"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Inclusive
                        </label>
                        <input
                          type="checkbox"
                          name="inclusive"
                          id="inclusive"
                          defaultValue={
                            editId
                              ? data?.find((item) => item.id === editId)
                                  ?.inclusive
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Enter inclusive"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="cover"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Cover
                        </label>
                        <input
                          type="file"
                          name="cover"
                          id="cover"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Upload cover"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="image"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Image 1
                        </label>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Upload image"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="image2"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Image 2
                        </label>
                        <input
                          type="file"
                          name="image2"
                          id="image2"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Upload image"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="brand"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Brand title
                        </label>
                        <select
                          id="brand"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="">Choose a Brand</option>
                          {brand?.map((el) => (
                            <option key={el.id} value={el.id}>
                              {el.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="model"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Model title
                        </label>
                        <select
                          id="model"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="">Choose a Model</option>
                          {model?.map((el) => (
                            <option key={el.id} value={el.id}>
                              {el.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          City title
                        </label>
                        <select
                          id="city"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="">Choose a City</option>
                          {city?.map((el) => (
                            <option key={el.id} value={el.id}>
                              {el.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Category title
                        </label>
                        <select
                          id="category"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="">Choose a Category</option>
                          {category?.map((el) => (
                            <option key={el.id} value={el.id}>
                              {el.name_en}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="location"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Location title
                        </label>
                        <select
                          id="location"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="">Choose a Location</option>
                          {location?.map((el) => (
                            <option key={el.id} value={el.id}>
                              {el.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      disabled={loadingBtn}
                    >
                      {loadingBtn
                        ? editId
                          ? "Updating..."
                          : "Creating..."
                        : editId
                        ? "Update"
                        : "Create"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete modal */}
        {deleteId && (
          <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative mx-auto top-[30%] p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button
                  onClick={() => setDeleteId(null)}
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this product?
                  </h3>
                  <button
                    onClick={handleDelete}
                    data-modal-hide="popup-modal"
                    type="button"
                    disabled={loadingBtn}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    {loadingBtn ? "Deleting...." : "Yes, I'm sure"}
                  </button>
                  <button
                    onClick={() => setDeleteId(null)}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Cars;
