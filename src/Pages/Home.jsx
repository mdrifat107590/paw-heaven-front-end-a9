import { Link } from "react-router-dom";
import pets from "../data/pets";
import PetCard from "../Components/PetCard";

const Home = () => {

  return (
    <div>

      <section className="bg-orange-50 py-20">

        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">

          <div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">

              Find Your
              <span className="text-orange-500">
                {" "}Perfect Pet
              </span>
              Companion

            </h1>

            <p className="text-gray-600 text-lg mb-8">

              Give a loving home to pets waiting for adoption.
              Discover adorable pets and start your adoption journey today.

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

            <h2 className="text-4xl font-bold mb-4">
              Featured Pets
            </h2>

            <p className="text-gray-600">
              Meet our adorable pets waiting for a loving home.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {
              pets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                />
              ))
            }

          </div>

        </div>

      </section>

      <section className="bg-gray-100 py-20">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold mb-4">
              Why Adopt Pets?
            </h2>

            <p className="text-gray-600">
              Adopting a pet changes both your life and theirs.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow">

              <h3 className="text-2xl font-bold mb-4">
                Save Lives
              </h3>

              <p className="text-gray-600">
                Give abandoned pets a second chance for happiness.
              </p>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow">

              <h3 className="text-2xl font-bold mb-4">
                Loyal Companion
              </h3>

              <p className="text-gray-600">
                Pets bring unconditional love and friendship.
              </p>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow">

              <h3 className="text-2xl font-bold mb-4">
                Better Mental Health
              </h3>

              <p className="text-gray-600">
                Spending time with pets reduces stress and loneliness.
              </p>

            </div>

          </div>

        </div>

      </section>


      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold mb-4">
              Success Stories
            </h2>

            <p className="text-gray-600">
              Real stories from happy pet adopters.
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-orange-50 p-8 rounded-2xl">

              <p className="text-gray-700 mb-4">
                "Adopting Max was the best decision of my life.
                He brings joy to our family every day."
              </p>

              <h4 className="font-bold">
                — Sarah Ahmed
              </h4>

            </div>

            <div className="bg-orange-50 p-8 rounded-2xl">

              <p className="text-gray-700 mb-4">
                "Luna has become my best friend.
                Thank you for this amazing platform."
              </p>

              <h4 className="font-bold">
                — Tanvir Hasan
              </h4>

            </div>

          </div>

        </div>

      </section>

      <section className="bg-gray-100 py-20">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold mb-4">
              Pet Care Tips
            </h2>

            <p className="text-gray-600">
              Helpful tips for taking care of your furry friends.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-2xl shadow">

              <h3 className="text-2xl font-bold mb-3">
                Healthy Food
              </h3>

              <p className="text-gray-600">
                Feed your pets nutritious and balanced meals daily.
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow">

              <h3 className="text-2xl font-bold mb-3">
                Regular Exercise
              </h3>

              <p className="text-gray-600">
                Keep pets active and healthy with daily activities.
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow">

              <h3 className="text-2xl font-bold mb-3">
                Vet Checkups
              </h3>

              <p className="text-gray-600">
                Schedule regular veterinary checkups for your pets.
              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold mb-4">
              Adoption Process
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white shadow p-6 rounded-2xl text-center">
              Browse Pets
            </div>

            <div className="bg-white shadow p-6 rounded-2xl text-center">
              Submit Request
            </div>

            <div className="bg-white shadow p-6 rounded-2xl text-center">
              Meet the Pet
            </div>

            <div className="bg-white shadow p-6 rounded-2xl text-center">
              Bring Home
            </div>

          </div>

        </div>

      </section>

      <section className="bg-orange-50 py-20">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold mb-4">
              Meet Our Volunteers
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow text-center">

              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt=""
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />

              <h3 className="text-2xl font-bold">
                Ayesha
              </h3>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow text-center">

              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt=""
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />

              <h3 className="text-2xl font-bold">
                Rakib
              </h3>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow text-center">

              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt=""
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />

              <h3 className="text-2xl font-bold">
                Nusrat
              </h3>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;