const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>

        <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
      </div>
    </div>
  );
};

export default Loader;
