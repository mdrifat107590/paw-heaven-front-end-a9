import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaClipboardList } from "react-icons/fa";

const MyListings = () => {
  const myPets = [
    {
      id: 1,
      name: "Max",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
      fee: 5000,
      status: "Available",
    },
    {
      id: 2,
      name: "Luna",
      image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4",
      fee: 3000,
      status: "Adopted",
    },
    {
      id: 3,
      name: "Charlie",
      image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308",
      fee: 2500,
      status: "Available",
    },
  ];

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
                  className={`
                    px-4 py-1 rounded-full text-sm font-semibold
                    ${
                      pet.status === "Available"
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
                {pet.name}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition">
                  <FaClipboardList />
                  Requests
                </button>

                <button className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl transition">
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

                <button className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition">
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
