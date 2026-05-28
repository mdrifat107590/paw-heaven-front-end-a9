import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import PetCard from "../Components/PetCard";

const Home = () => {
  const [featuredPets, setFeaturedPets] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pet-heaven-server-a9.onrender.com/featured-pets")
      .then((res) => res.json())

      .then((data) => {
        setFeaturedPets(data);
        console.log(data)
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your
              <span className="text-orange-500"> Perfect Pet</span>
              Companion
            </h1>

            <p className="text-gray-600 text-lg mb-8">
              Give a loving home to pets waiting for adoption. Discover adorable
              pets and start your adoption journey today.
            </p>

            <Link
              to="/all-pets"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg transition"
            >
              Adopt Now
            </Link>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e"
              alt="pet"
              className="rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Featured Pets</h2>

            <p className="text-gray-600">
              Meet our adorable pets waiting for a loving home.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-lg text-orange-500"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Why Adopt Pets?</h2>

            <p className="text-gray-600">
              Adopting a pet changes both your life and theirs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4">Save Lives</h3>

              <p className="text-gray-600">
                Give abandoned pets a second chance for happiness.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4">Loyal Companion</h3>

              <p className="text-gray-600">
                Pets bring unconditional love and friendship.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow">
              <h3 className="text-2xl font-bold mb-4">Better Mental Health</h3>

              <p className="text-gray-600">
                Spending time with pets reduces stress and loneliness.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
