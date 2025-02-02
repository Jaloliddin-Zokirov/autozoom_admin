import React, { useEffect, useState } from "react";
import { axios, Forimage } from "../../Server/Api";
import { toast } from "react-toastify";

const Cities = () => {
  const [data, setData] = useState(null);
  const [editId, setEditId] = useState(null);
  const [create, setCreate] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  // Get Cities
  useEffect(() => {
    axios.get("/cities").then((response) => {
      setData(response?.data?.data);
    });
  }, [deleteId, editId, create]);

  // Add new Cities
  const handleAdd = async (evt) => {
    evt.preventDefault();
    setLoadingBtn(true);

    const formData = new FormData();
    formData.append("name", document.getElementById("name")?.value);
    formData.append("text", document.getElementById("text")?.value);
    formData.append("images", document.getElementById("image")?.files[0]);

    try {
      const response = await axios.post("/cities", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Add successful");
      setCreate(null);
    } catch (error) {
      toast.error("Error, Please try again");
    } finally {
      setLoadingBtn(false);
    }
  };

  // Edit Cities
  const handleEdit = async (evt) => {
    evt.preventDefault();
    setLoadingBtn(true);

    const formData = new FormData();
    formData.append("name", document.getElementById("name")?.value);
    formData.append("text", document.getElementById("text")?.value);
    formData.append("images", document.getElementById("image")?.files[0]);

    try {
      const response = await axios.put(`/cities/${editId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setEditId(null);
      toast.success("Update successful");
    } catch (error) {
      toast.error("Error, Please try again");
    } finally {
      setLoadingBtn(false);
    }
  };

  // Delete Cities
  const handleDelete = () => {
    setLoadingBtn(true);
    axios
      .delete(`/cities/${deleteId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        toast.success("Success to delete");
        setDeleteId(null);
      })
      .catch(() => {
        toast.error("Error, Please try again");
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
          <h2 className="font-bold text-3xl">Cities</h2>
          <button
            onClick={() => setCreate("newCities")}
            type="button"
            className="cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add new Cities
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Text
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
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
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{el.name}</td>
                    <td className="px-6 py-4">{el.text}</td>
                    <td className="px-6 py-4">
                      <img
                        src={`${Forimage}/${el.image_src}`}
                        width={30}
                        height={20}
                        alt="image"
                      />
                    </td>
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
            <div className="relative mx-auto top-[20%] p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {editId ? "Edit Cities" : "Add Cities"}
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
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={
                          editId
                            ? data?.find((item) => item.id === editId)?.name
                            : ""
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Text
                      </label>
                      <input
                        type="text"
                        name="text"
                        id="text"
                        defaultValue={
                          editId
                            ? data?.find((item) => item.id === editId)?.text
                            : ""
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter text"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="image"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/png, image/jpeg"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Upload image"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loadingBtn}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default Cities;
