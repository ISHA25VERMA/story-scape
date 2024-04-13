import Home from "../Components/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

export default routes;
