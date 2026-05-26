import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import DashboardLayout from "../layout/DashboardLayout";

import MyRequests from "../Pages/Dashboard/MyRequests";

import MyListings from "../Pages/Dashboard/MyListings";

import AddPet from "../Pages/Dashboard/AddPet";

import Dashboard from "../Pages/Dashboard/Dashboard";

import ErrorPage from "../Pages/ErrorPage";

import Home from "../Pages/Home";

import AllPets from "../Pages/AllPets";

import PetDetails from "../Pages/PetDetails";

import Login from "../Pages/Login";

import Register from "../Pages/Register";

import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",

    element: <MainLayout />,

    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",

        element: <Home />,
      },

      {
        path: "/all-pets",

        element: <AllPets />,
      },

      {
        path: "/all-pets/:id",

        element: (
          <PrivateRoute>
            <PetDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/login",

        element: <Login />,
      },

      {
        path: "/register",

        element: <Register />,
      },
    ],
  },

  {
    path: "/dashboard",

    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        index: true,

        element: <Dashboard />,
      },

      {
        path: "add-pet",

        element: <AddPet />,
      },

      {
        path: "my-listings",

        element: <MyListings />,
      },

      {
        path: "my-requests",

        element: <MyRequests />,
      },
    ],
  },
]);

export default router;