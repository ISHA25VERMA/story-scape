import { Children } from "react";
import Home from "../Components/Home";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import MyStories from "../Components/Story/MyStories";
import CreateStory from "../Components/Story/CreateStory";
import authRoutes from "./routes/auth";

console.log(authRoutes);

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/createStory",
    element: <CreateStory />,
  },
  {
    path: "/myStories",
    element: <MyStories />,
  },
];

export default routes;
