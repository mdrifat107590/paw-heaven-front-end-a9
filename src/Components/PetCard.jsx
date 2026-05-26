import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  const {
    id,
    name,
    breed,
    age,
    location,
    image,
    species,
    fee,
  } = pet;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-6">
        <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
          {species}
        </span>

        <h2 className="text-3xl font-bold mt-4 mb-3">
          {name}
        </h2>

        <div className="space-y-2 text-gray-600 mb-5">
          <p>
            <span className="font-semibold">
              Breed:
            </span>{" "}
            {breed}
          </p>

          <p>
            <span className="font-semibold">
              Age:
            </span>{" "}
            {age}
          </p>

          <p>
            <span className="font-semibold">
              Location:
            </span>{" "}
            {location}
          </p>

          <p>
            <span className="font-semibold">
              Adoption Fee:
            </span>{" "}
            ৳ {fee}
          </p>
        </div>

        <Link
          to={`/pet/${id}`}
          className="block text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PetCard;