import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaTrash } from "react-icons/fa";

const MyRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      petId: 101,
      petName: "Max",
      petImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
      requestDate: "2026-05-10",
      pickupDate: "2026-05-20",
      status: "Pending",
    },
    {
      id: 2,
      petId: 102,
      petName: "Luna",
      petImage: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4",
      requestDate: "2026-05-08",
      pickupDate: "2026-05-18",
      status: "Approved",
    },
    {
      id: 3,
      petId: 103,
      petName: "Charlie",
      petImage: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308",
      requestDate: "2026-05-01",
      pickupDate: "2026-05-12",
      status: "Rejected",
    },
  ]);

  const handleCancelRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This adoption request will be canceled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const remainingRequests = requests.filter(
          (request) => request.id !== id
        );
        setRequests(remainingRequests);
        Swal.fire({
          icon: "success",
          title: "Request Canceled Successfully",
        });
      }
    });
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-6">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">My Requests</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Track and manage all your adoption requests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between">
          <h3 className="text-gray-500 font-medium mb-2">Total Requests</h3>
          <h2 className="text-4xl font-bold text-orange-500">
            {requests.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between">
          <h3 className="text-gray-500 font-medium mb-2">Approved Requests</h3>
          <h2 className="text-4xl font-bold text-green-500">
            {requests.filter((request) => request.status === "Approved").length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between sm:col-span-2 md:col-span-1">
          <h3 className="text-gray-500 font-medium mb-2">Pending Requests</h3>
          <h2 className="text-4xl font-bold text-yellow-500">
            {requests.filter((request) => request.status === "Pending").length}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Mobile View: Cards (Visible only on small screens) */}
        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {requests.map((request) => (
            <div key={request.id} className="border border-gray-100 rounded-2xl p-4 shadow-sm bg-gray-50">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={request.petImage}
                  alt={request.petName}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{request.petName}</h3>
                  <span
                    className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold ${
                      request.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : request.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p><span className="font-medium text-gray-800">Request Date:</span> {request.requestDate}</p>
                <p><span className="font-medium text-gray-800">Pickup Date:</span> {request.pickupDate}</p>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/pet/${request.petId}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl transition font-medium text-sm"
                >
                  <FaEye /> View
                </Link>
                <button
                  onClick={() => handleCancelRequest(request.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl transition font-medium text-sm"
                >
                  <FaTrash /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table (Hidden on small screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Pet</th>
                <th className="text-left py-4 px-6 font-semibold">Request Date</th>
                <th className="text-left py-4 px-6 font-semibold">Pickup Date</th>
                <th className="text-left py-4 px-6 font-semibold">Status</th>
                <th className="text-center py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
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
                    {request.requestDate}
                  </td>
                  <td className="py-5 px-6 text-gray-700">
                    {request.pickupDate}
                  </td>
                  <td className="py-5 px-6">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        request.status === "Approved"
                          ? "bg-green-100 text-green-600"
                          : request.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/pet/${request.petId}`}
                        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition"
                        title="View Details"
                      >
                        <FaEye />
                      </Link>
                      <button
                        onClick={() => handleCancelRequest(request.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
                        title="Cancel Request"
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