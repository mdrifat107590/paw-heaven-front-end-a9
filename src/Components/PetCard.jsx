import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {

  const { id, name, breed, age, location, image } = pet;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">

      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold mb-2">
          {name}
        </h2>

        <p className="text-gray-600">
          Breed: {breed}
        </p>

        <p className="text-gray-600">
          Age: {age}
        </p>

        <p className="text-gray-600 mb-4">
          Location: {location}
        </p>

        <Link
          to={`/pet/${id}`}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg inline-block transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default PetCard;