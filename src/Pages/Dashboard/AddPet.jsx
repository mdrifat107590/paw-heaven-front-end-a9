import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const AddPet = () => {
  const { user } = useContext(AuthContext);

  const handleAddPet = async (e) => {
    e.preventDefault();

    const form = e.target;

    const petData = {
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
      ownerEmail: user?.email,
      status: "Available",
      createdAt: new Date(),
    };

    try {
      const response = await fetch("http://localhost:5000/pets", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(petData),
      });

      const data = await response.json();
      console.log(data);
      if (data.result.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Pet Added Successfully",
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
  return (
    <div className="min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Add New Pet</h1>
        <p className="text-gray-600">
          Fill out the form below to add a pet for adoption.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 lg:p-10">
        <form
          onSubmit={handleAddPet}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Pet Name
            </label>
            <input
              type="text"
              name="petName"
              placeholder="Enter pet name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Species
            </label>
            <select
              name="species"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            >
              <option value="">Select Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Breed
            </label>
            <input
              type="text"
              name="breed"
              placeholder="Enter breed"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Age
            </label>
            <input
              type="text"
              name="age"
              placeholder="Enter pet age"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="Enter image URL"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Health Status
            </label>
            <input
              type="text"
              name="health"
              placeholder="Healthy / Injured etc."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Vaccination Status
            </label>
            <select
              name="vaccination"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            >
              <option value="">Select Status</option>
              <option value="Vaccinated">Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Adoption Fee
            </label>
            <input
              type="number"
              name="fee"
              placeholder="Enter adoption fee"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-gray-700">
              Owner Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="6"
              placeholder="Write pet details..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 resize-none"
              required
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold transition"
            >
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
