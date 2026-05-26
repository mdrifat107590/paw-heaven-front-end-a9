import { useContext, useEffect, useState } from "react";

import { FaPaw, FaHeart, FaCheckCircle, FaClock } from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  const [myPets, setMyPets] = useState([]);

  const [myRequests, setMyRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      Promise.all([
        fetch(`http://localhost:5000/my-pets?email=${user.email}`).then((res) =>
          res.json(),
        ),

        fetch(`http://localhost:5000/requests?email=${user.email}`).then(
          (res) => res.json(),
        ),
      ])

        .then(([petsData, requestsData]) => {
          setMyPets(petsData);

          setMyRequests(requestsData);

          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Welcome Back,
          <span className="text-orange-500"> {user?.displayName}</span>
        </h1>

        <p className="text-gray-600">
          Here is your adoption activity overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-500 flex justify-center items-center text-3xl">
            <FaPaw />
          </div>

          <div>
            <h3 className="text-gray-500 mb-1">Pets Added</h3>

            <h2 className="text-4xl font-bold text-gray-800">
              {myPets.length}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-500 flex justify-center items-center text-3xl">
            <FaHeart />
          </div>

          <div>
            <h3 className="text-gray-500 mb-1">Pets Adopted</h3>

            <h2 className="text-4xl font-bold text-gray-800">
              {
                myRequests.filter((request) => request.status === "approved")
                  .length
              }
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-500 flex justify-center items-center text-3xl">
            <FaCheckCircle />
          </div>

          <div>
            <h3 className="text-gray-500 mb-1">Available Pets</h3>

            <h2 className="text-4xl font-bold text-gray-800">
              {myPets.filter((pet) => pet.status === "available").length}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-yellow-100 text-yellow-500 flex justify-center items-center text-3xl">
            <FaClock />
          </div>

          <div>
            <h3 className="text-gray-500 mb-1">Pending Requests</h3>

            <h2 className="text-4xl font-bold text-gray-800">
              {
                myRequests.filter((request) => request.status === "pending")
                  .length
              }
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Recently Added Pets
          </h2>

          <div className="space-y-5">
            {myPets.slice(0, 5).map((pet) => (
              <div
                key={pet._id}
                className="flex items-center gap-4 border-b border-gray-100 pb-4"
              >
                <img
                  src={pet.image}
                  alt={pet.petName}
                  className="w-16 h-16 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{pet.petName}</h3>

                  <p className="text-gray-500 text-sm">{pet.species}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold

                      ${
                        pet.status === "available"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }
                    `}
                >
                  {pet.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Recent Adoption Requests
          </h2>

          <div className="space-y-5">
            {myRequests.slice(0, 5).map((request) => (
              <div
                key={request._id}
                className="flex items-center gap-4 border-b border-gray-100 pb-4"
              >
                <img
                  src={request.petImage}
                  alt={request.petName}
                  className="w-16 h-16 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{request.petName}</h3>

                  <p className="text-gray-500 text-sm">
                    Pickup: {request.pickupDate}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold

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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
