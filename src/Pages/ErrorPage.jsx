import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">

      <h1 className="text-6xl font-bold">
        404
      </h1>

      <p className="my-4">
        Page Not Found
      </p>

      <Link
        to="/"
        className="bg-orange-500 text-white px-5 py-2 rounded"
      >
        Back Home
      </Link>

    </div>
  );
};

export default ErrorPage;