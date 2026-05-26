import { useParams } from "react-router-dom";
import pets from "../data/pets";

const PetDetails = () => {
  const { id } = useParams();

  const pet = pets.find(
    (singlePet) => singlePet.id === parseInt(id)
  );

  if (!pet) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-4xl font-bold">
          Pet Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
            />
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <span className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold">
              {pet.species}
            </span>

            <h1 className="text-5xl font-bold mt-6 mb-6">
              {pet.name}
            </h1>

            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <span className="font-bold">
                  Breed:
                </span>{" "}
                {pet.breed}
              </p>

              <p>
                <span className="font-bold">
                  Age:
                </span>{" "}
                {pet.age}
              </p>

              <p>
                <span className="font-bold">
                  Location:
                </span>{" "}
                {pet.location}
              </p>

              <p>
                <span className="font-bold">
                  Adoption Fee:
                </span>{" "}
                ৳ {pet.fee}
              </p>

              <p>
                <span className="font-bold">
                  Gender:
                </span>{" "}
                Male
              </p>

              <p>
                <span className="font-bold">
                  Vaccination:
                </span>{" "}
                Vaccinated
              </p>

              <p>
                <span className="font-bold">
                  Health Status:
                </span>{" "}
                Healthy
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-3">
                About {pet.name}
              </h3>

              <p className="text-gray-600 leading-8">
                {pet.name} is a friendly and adorable pet
                looking for a loving forever home.
                This pet is playful, healthy, and perfect
                for families who love animals.
              </p>
            </div>

            <button
              className="w-full mt-10 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold transition"
            >
              Adopt Now
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg mt-16 p-10">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Adoption Request Form
            </h2>

            <p className="text-gray-600">
              Fill out the form below to request adoption.
            </p>
          </div>

          <form className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">
                Pet Name
              </label>

              <input
                type="text"
                value={pet.name}
                readOnly
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                User Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                User Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Pickup Date
              </label>

              <input
                type="date"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">
                Message
              </label>

              <textarea
                rows="5"
                placeholder="Why do you want to adopt this pet?"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold transition"
              >
                Submit Adoption Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;