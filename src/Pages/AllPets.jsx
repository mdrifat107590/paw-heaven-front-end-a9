import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";

const AllPets = () => {
  const [searchText, setSearchText] = useState("");
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/pets")
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">All Pets</h1>
          <p className="text-gray-600 text-lg">
            Find your perfect furry friend for adoption.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <input
              type="text"
              placeholder="Search by pet name..."
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500">
              <option>All Species</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Rabbit</option>
              <option>Bird</option>
            </select>

            <select className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500">
              <option>All Locations</option>
              <option>Dhaka</option>
              <option>Rajshahi</option>
              <option>Sylhet</option>
              <option>Chittagong</option>
            </select>

            <select className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500">
              <option>Sort By</option>
              <option>Newest</option>
              <option>Oldest</option>
              <option>Low Adoption Fee</option>
              <option>High Adoption Fee</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets
            .filter((pet) =>
              pet.petName?.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllPets;