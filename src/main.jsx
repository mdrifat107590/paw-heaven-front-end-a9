import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./providers/AuthProvider"
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
      <RouterProvider router={router} />
  </AuthProvider>,
);
