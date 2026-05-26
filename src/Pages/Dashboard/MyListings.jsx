import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye, FaClipboardList } from "react-icons/fa";

const MyListings = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [updatePet, setUpdatePet] = useState(null);

  const [myPets, setMyPets] = useState([
    {
      id: 1,
      name: "Max",
      species: "Dog",
      breed: "Golden Retriever",
      age: "2 Years",
      gender: "Male",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
      health: "Healthy",
      vaccination: "Vaccinated",
      location: "Dhaka",
      fee: 5000,
      description: "Friendly and energetic dog.",
      ownerEmail: "owner@gmail.com",
      status: "Available",
      requests: [
        {
          id: 1,
          userName: "Rahim Ahmed",
          email: "rahim@gmail.com",
          pickupDate: "2026-05-20",
          status: "Pending",
        },
        {
          id: 2,
          userName: "Nusrat Jahan",
          email: "nusrat@gmail.com",
          pickupDate: "2026-05-25",
          status: "Approved",
        },
      ],
    },
    {
      id: 2,
      name: "Luna",
      species: "Cat",
      breed: "Persian",
      age: "1 Year",
      gender: "Female",
      image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4",
      health: "Healthy",
      vaccination: "Vaccinated",
      location: "Rajshahi",
      fee: 3000,
      description: "Cute and calm cat.",
      ownerEmail: "owner@gmail.com",
      status: "Adopted",
      requests: [
        {
          id: 1,
          userName: "Karim Hasan",
          email: "karim@gmail.com",
          pickupDate: "2026-06-01",
          status: "Rejected",
        },
      ],
    },
  ]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This pet will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const remainingPets = myPets.filter((pet) => pet.id !== id);
        setMyPets(remainingPets);
        Swal.fire({
          icon: "success",
          title: "Pet Deleted Successfully",
        });
      }
    });
  };

  const handleUpdatePet = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedPet = {
      ...updatePet,
      name: form.petName.value,
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

    const updatedPets = myPets.map((pet) =>
      pet.id === updatePet.id ? updatedPet : pet,
    );

    setMyPets(updatedPets);
    setUpdatePet(null);

    Swal.fire({
      icon: "success",
      title: "Pet Updated Successfully",
    });
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
            {myPets.filter((pet) => pet.status === "Available").length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500 mb-2">Adopted Pets</h3>
          <h2 className="text-4xl font-bold text-red-500">
            {myPets.filter((pet) => pet.status === "Adopted").length}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {myPets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    pet.status === "Available"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {pet.status}
                </span>
                <h3 className="text-2xl font-bold text-orange-500">
                  ৳ {pet.fee}
                </h3>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {pet.name}
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
                  to={`/pet/${pet.id}`}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition"
                >
                  <FaEye />
                  View
                </Link>

                <button
                  onClick={() => handleDelete(pet.id)}
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
              Adoption Requests for {selectedPet.name}
            </h2>

            <div className="space-y-5">
              {selectedPet.requests.map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-2xl p-5"
                >
                  <div className="space-y-2 mb-5">
                    <p>
                      <span className="font-semibold">User Name:</span>{" "}
                      {request.userName}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {request.email}
                    </p>
                    <p>
                      <span className="font-semibold">Pickup Date:</span>{" "}
                      {request.pickupDate}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`font-semibold ${
                          request.status === "Approved"
                            ? "text-green-500"
                            : request.status === "Rejected"
                              ? "text-red-500"
                              : "text-yellow-500"
                        }`}
                      >
                        {request.status}
                      </span>
                    </p>
                  </div>

                  {request.status === "Pending" && (
                    <div className="flex gap-4">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition">
                        Approve
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition">
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
                  defaultValue={updatePet.name}
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

              <div>
                <label className="block mb-2 font-semibold">Gender</label>
                <input
                  type="text"
                  name="gender"
                  defaultValue={updatePet.gender}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Image URL</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={updatePet.image}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Health Status
                </label>
                <input
                  type="text"
                  name="health"
                  defaultValue={updatePet.health}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Vaccination</label>
                <input
                  type="text"
                  name="vaccination"
                  defaultValue={updatePet.vaccination}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={updatePet.location}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Adoption Fee</label>
                <input
                  type="number"
                  name="fee"
                  defaultValue={updatePet.fee}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold">Description</label>
                <textarea
                  name="description"
                  rows="5"
                  defaultValue={updatePet.description}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 resize-none"
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold transition"
                >
                  Update Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
