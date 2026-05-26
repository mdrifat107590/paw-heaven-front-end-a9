import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Swal from "sweetalert2";

import { AuthContext } from "../context/AuthContext";

const PetDetails = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const [pet, setPet] = useState({});

  const [loading, setLoading] = useState(true);

  const [alreadyRequested, setAlreadyRequested] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/pets/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPet(data);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (user?.email && pet?._id) {
      fetch(
        `http://localhost:5000/requests/check?petId=${pet._id}&email=${user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setAlreadyRequested(data.exists);
        });
    }
  }, [user, pet]);

  const isOwner = user?.email === pet?.ownerEmail;
  const isAdopted = pet?.status === "adopted";
  const handleAdoption = async (e) => {
    e.preventDefault();
    if (isOwner) {
      return Swal.fire({
        icon: "warning",
        title: "You cannot adopt your own pet",
      });
    }
    if (isAdopted) {
      return Swal.fire({
        icon: "warning",
        title: "This pet is already adopted",
      });
    }
    if (alreadyRequested) {
      return Swal.fire({
        icon: "warning",
        title: "You already requested this pet",
      });
    }

    const form = e.target;
    const adoptionData = {
      petId: pet._id,
      petName: pet.petName,
      petImage: pet.image,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      ownerEmail: pet.ownerEmail,
      pickupDate: form.pickupDate.value,
      message: form.message.value,
      status: "pending",
      requestDate: new Date(),
    };

    try {
      const response = await fetch("http://localhost:5000/requests", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(adoptionData),
      });

      const data = await response.json();

      if (data.insertedId) {
        setAlreadyRequested(true);

        Swal.fire({
          icon: "success",
          title: "Adoption Request Submitted",
        });

        form.reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg overflow-hidden">
            <img
              src={pet.image}
              alt={pet.petName}
              className="w-full h-[500px] object-cover"
            />

            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 mb-8">
                <div>
                  <span className="bg-orange-100 text-orange-500 px-4 py-1 rounded-full text-sm font-semibold">
                    {pet.species}
                  </span>

                  <h1 className="text-5xl font-bold text-gray-800 mt-4">
                    {pet.petName}
                  </h1>
                </div>

                <div>
                  <h2 className="text-4xl font-bold text-orange-500">
                    ৳ {pet.fee}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-orange-50 p-5 rounded-2xl">
                  <h3 className="text-gray-500 mb-2">Breed</h3>

                  <p className="text-xl font-bold text-gray-800">{pet.breed}</p>
                </div>

                <div className="bg-orange-50 p-5 rounded-2xl">
                  <h3 className="text-gray-500 mb-2">Age</h3>

                  <p className="text-xl font-bold text-gray-800">{pet.age}</p>
                </div>

                <div className="bg-orange-50 p-5 rounded-2xl">
                  <h3 className="text-gray-500 mb-2">Gender</h3>

                  <p className="text-xl font-bold text-gray-800">
                    {pet.gender}
                  </p>
                </div>

                <div className="bg-orange-50 p-5 rounded-2xl">
                  <h3 className="text-gray-500 mb-2">Location</h3>

                  <p className="text-xl font-bold text-gray-800">
                    {pet.location}
                  </p>
                </div>

                <div className="bg-orange-50 p-5 rounded-2xl">
                  <h3 className="text-gray-500 mb-2">Health Status</h3>

                  <p className="text-xl font-bold text-gray-800">
                    {pet.health}
                  </p>
                </div>

                <div className="bg-orange-50 p-5 rounded-2xl">
                  <h3 className="text-gray-500 mb-2">Vaccination</h3>

                  <p className="text-xl font-bold text-gray-800">
                    {pet.vaccination}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-5">
                  About {pet.petName}
                </h2>

                <p className="text-gray-600 leading-8 text-lg">
                  {pet.description}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-8 h-fit sticky top-28">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Adoption Form
            </h2>

            <form onSubmit={handleAdoption} className="space-y-5">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Pet Name
                </label>

                <input
                  type="text"
                  value={pet.petName || ""}
                  readOnly
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  User Name
                </label>

                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  User Email
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Pickup Date
                </label>

                <input
                  type="date"
                  name="pickupDate"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  required
                  disabled={isOwner || isAdopted || alreadyRequested}
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Why do you want to adopt this pet?"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 resize-none"
                  required
                  disabled={isOwner || isAdopted || alreadyRequested}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isOwner || isAdopted || alreadyRequested}
                className={`w-full py-4 rounded-2xl text-lg font-semibold transition text-white
                  
                  ${
                    isOwner || isAdopted || alreadyRequested
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600"
                  }
                `}
              >
                {isOwner
                  ? "You Own This Pet"
                  : isAdopted
                    ? "Already Adopted"
                    : alreadyRequested
                      ? "Request Already Sent"
                      : "Adopt Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
