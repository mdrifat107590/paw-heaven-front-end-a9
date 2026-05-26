import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import { FaEdit, FaTrash, FaEye, FaClipboardList } from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";

const MyListings = () => {
  const { user } = useContext(AuthContext);

  const [selectedPet, setSelectedPet] = useState(null);

  const [updatePet, setUpdatePet] = useState(null);

  const [myPets, setMyPets] = useState([]);

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-pets?email=${user.email}`, {
        credentials: "include",
      })
        .then((res) => res.json())

        .then((data) => setMyPets(data));
    }
  }, [user]);

  useEffect(() => {
    if (selectedPet?._id) {
      fetch(`http://localhost:5000/pet-requests/${selectedPet._id}`, {
        credentials: "include",
      })
        .then((res) => res.json())

        .then((data) => setRequests(data));
    }
  }, [selectedPet]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This pet will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
    })

      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(`http://localhost:5000/pets/${_id}`, {
            method: "DELETE",
            credentials: "include",
          });

          const data = await response.json();

          if (data.deletedCount > 0) {
            const remainingPets = myPets.filter((pet) => pet._id !== _id);

            setMyPets(remainingPets);

            Swal.fire({
              icon: "success",

              title: "Pet Deleted Successfully",
            });
          }
        }
      });
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedPet = {
      petName: form.petName.value,
      species: form.species.value,
      breed: form.breed.value,
      age: form.age.value,
      gender: form.gender.value,
      image: form.image.value,
      health: form.health.value,
      vaccination: form.vaccination.value,
      location: form.location.value,
      fee: form.fee.value,
      description: form.description.value,
    };

    const response = await fetch(
      `http://localhost:5000/pets/${updatePet._id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedPet),
      },
    );

    const data = await response.json();

    if (data.modifiedCount > 0) {
      const updatedPets = myPets.map((pet) =>
        pet._id === updatePet._id
          ? {
              ...pet,
              ...updatedPet,
            }
          : pet,
      );

      setMyPets(updatedPets);

      setUpdatePet(null);

      Swal.fire({
        icon: "success",

        title: "Pet Updated Successfully",
      });
    }
  };

  const handleApprove = async (requestId, petId) => {
    const response = await fetch(
      `http://localhost:5000/requests/status/${requestId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify({
          status: "approved",

          petId,
        }),
      },
    );

    const data = await response.json();

    if (data.message) {
      return Swal.fire({
        icon: "warning",

        title: data.message,
      });
    }

    if (data.modifiedCount > 0) {
      const updatedRequests = requests.map((request) =>
        request._id === requestId
          ? {
              ...request,
              status: "approved",
            }
          : {
              ...request,
              status:
                request.status === "pending" ? "rejected" : request.status,
            },
      );

      setRequests(updatedRequests);

      const updatedPets = myPets.map((pet) =>
        pet._id === petId
          ? {
              ...pet,
              status: "adopted",
            }
          : pet,
      );

      setMyPets(updatedPets);

      Swal.fire({
        icon: "success",

        title: "Request Approved Successfully",
      });
    }
  };

  const handleReject = async (requestId, petId) => {
    const response = await fetch(
      `http://localhost:5000/requests/status/${requestId}`,
      {
        method: "PATCH",

        credentials: "include",

        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify({
          status: "rejected",

          petId,
        }),
      },
    );

    const data = await response.json();

    if (data.message) {
      return Swal.fire({
        icon: "warning",

        title: data.message,
      });
    }

    if (data.modifiedCount > 0) {
      const updatedRequests = requests.map((request) =>
        request._id === requestId
          ? {
              ...request,
              status: "rejected",
            }
          : request,
      );

      setRequests(updatedRequests);

      Swal.fire({
        icon: "success",

        title: "Request Rejected Successfully",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">My Listings</h1>

        <p className="text-gray-600">Manage all your pet listings from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500 mb-2">Total Listings</h3>

          <h2 className="text-4xl font-bold text-orange-500">
            {myPets.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500 mb-2">Available Pets</h3>

          <h2 className="text-4xl font-bold text-green-500">
            {myPets.filter((pet) => pet.status === "available").length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500 mb-2">Adopted Pets</h3>

          <h2 className="text-4xl font-bold text-red-500">
            {myPets.filter((pet) => pet.status === "adopted").length}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {myPets.map((pet) => (
          <div
            key={pet._id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            <img
              src={pet.image}
              alt={pet.petName}
              className="w-full h-72 object-cover"
            />

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold

                  ${
                    pet.status === "available"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }
                `}
                >
                  {pet.status}
                </span>

                <h3 className="text-2xl font-bold text-orange-500">
                  ৳ {pet.fee}
                </h3>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {pet.petName}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedPet(pet)}
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition"
                >
                  <FaClipboardList />
                  Requests
                </button>

                <button
                  onClick={() => setUpdatePet(pet)}
                  className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl transition"
                >
                  <FaEdit />
                  Edit
                </button>

                <Link
                  to={`/all-pets/${pet._id}`}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition"
                >
                  <FaEye />
                  View
                </Link>

                <button
                  onClick={() => handleDelete(pet._id)}
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPet && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl p-6 lg:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPet(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Adoption Requests for {selectedPet.petName}
            </h2>

            {requests.length === 0 && (
              <p className="text-gray-500">No Requests Found</p>
            )}

            <div className="space-y-5">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="border border-gray-200 rounded-2xl p-5"
                >
                  <div className="space-y-2 mb-5">
                    <p>
                      <span className="font-semibold">User Name:</span>{" "}
                      {request.requesterName}
                    </p>

                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {request.requesterEmail}
                    </p>

                    <p>
                      <span className="font-semibold">Pickup Date:</span>{" "}
                      {request.pickupDate}
                    </p>

                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`font-semibold

                          ${
                            request.status === "approved"
                              ? "text-green-500"
                              : request.status === "rejected"
                                ? "text-red-500"
                                : "text-yellow-500"
                          }
                        `}
                      >
                        {request.status}
                      </span>
                    </p>
                  </div>

                  {request.status === "pending" && (
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          handleApprove(request._id, selectedPet._id)
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleReject(request._id, selectedPet._id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {updatePet && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl p-6 lg:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setUpdatePet(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Update Pet
            </h2>

            <form
              onSubmit={handleUpdatePet}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block mb-2 font-semibold">Pet Name</label>

                <input
                  type="text"
                  name="petName"
                  defaultValue={updatePet.petName}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Species</label>

                <input
                  type="text"
                  name="species"
                  defaultValue={updatePet.species}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Breed</label>

                <input
                  type="text"
                  name="breed"
                  defaultValue={updatePet.breed}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Age</label>

                <input
                  type="text"
                  name="age"
                  defaultValue={updatePet.age}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  required
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
