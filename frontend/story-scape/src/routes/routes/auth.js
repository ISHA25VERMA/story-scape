import Login from "../../Components/Auth/Login";
import Register from "../../Components/Auth/Register";

const authRoutes = [
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
];

export default authRoutes;
