import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">

      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-orange-500 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">
          Dashboard
        </h2>

        <div className="flex flex-col gap-4">
          <Link to="/dashboard/add-pet">
            Add Pet
          </Link>

          <Link to="/dashboard/my-listings">
            My Listings
          </Link>

          <Link to="/dashboard/my-requests">
            My Requests
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;