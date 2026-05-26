import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import { FaEye, FaTrash } from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/requests?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRequests(data);
          setLoading(false);
        });
    }
  }, [user]);

  const handleCancelRequest = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This adoption request will be canceled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Cancel",
    })

      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(
            `http://localhost:5000/requests/${_id}`,
            {
              method: "DELETE",
            },
          );

          const data = await response.json();

          if (data.deletedCount > 0) {
            const remainingRequests = requests.filter(
              (request) => request._id !== _id,
            );

            setRequests(remainingRequests);

            Swal.fire({
              icon: "success",

              title: "Request Canceled Successfully",
            });
          } else {
            Swal.fire({
              icon: "warning",

              title: data.message || "Cannot Cancel Request",
            });
          }
        }
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-6">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          My Requests
        </h1>

        <p className="text-gray-600 text-sm md:text-base">
          Track and manage all your adoption requests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500 font-medium mb-2">Total Requests</h3>

          <h2 className="text-4xl font-bold text-orange-500">
            {requests.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500 font-medium mb-2">Approved Requests</h3>

          <h2 className="text-4xl font-bold text-green-500">
            {requests.filter((request) => request.status === "approved").length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500 font-medium mb-2">Pending Requests</h3>

          <h2 className="text-4xl font-bold text-yellow-500">
            {requests.filter((request) => request.status === "pending").length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {requests.map((request) => (
            <div
              key={request._id}
              className="border border-gray-100 rounded-2xl p-4 shadow-sm bg-gray-50"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={request.petImage}
                  alt={request.petName}
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {request.petName}
                  </h3>

                  <span
                    className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold

                    ${
                      request.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : request.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                    }
                  `}
                  >
                    {request.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p>
                  <span className="font-medium text-gray-800">
                    Request Date:
                  </span>{" "}
                  {new Date(request.requestDate).toLocaleDateString()}
                </p>

                <p>
                  <span className="font-medium text-gray-800">
                    Pickup Date:
                  </span>{" "}
                  {request.pickupDate}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/all-pets/${request.petId}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl transition font-medium text-sm"
                >
                  <FaEye />
                  View
                </Link>

                <button
                  onClick={() => handleCancelRequest(request._id)}
                  disabled={request.status === "approved"}
                  className={`flex-1 flex items-center justify-center gap-2 text-white py-2.5 rounded-xl transition font-medium text-sm

                  ${
                    request.status === "approved"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }
                `}
                >
                  <FaTrash />

                  {request.status === "approved" ? "Approved" : "Cancel"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Pet</th>

                <th className="text-left py-4 px-6 font-semibold">
                  Request Date
                </th>

                <th className="text-left py-4 px-6 font-semibold">
                  Pickup Date
                </th>

                <th className="text-left py-4 px-6 font-semibold">Status</th>

                <th className="text-center py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr
                  key={request._id}
                  className="border-b border-gray-200 hover:bg-orange-50/50 transition"
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={request.petImage}
                        alt={request.petName}
                        className="w-14 h-14 rounded-2xl object-cover"
                      />

                      <h3 className="font-bold text-gray-800">
                        {request.petName}
                      </h3>
                    </div>
                  </td>

                  <td className="py-5 px-6 text-gray-700">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </td>

                  <td className="py-5 px-6 text-gray-700">
                    {request.pickupDate}
                  </td>

                  <td className="py-5 px-6">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold

                      ${
                        request.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : request.status === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                      }
                    `}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/all-pets/${request.petId}`}
                        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition"
                      >
                        <FaEye />
                      </Link>

                      <button
                        onClick={() => handleCancelRequest(request._id)}
                        disabled={request.status === "approved"}
                        className={`text-white p-3 rounded-xl transition

                        ${
                          request.status === "approved"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }
                      `}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
