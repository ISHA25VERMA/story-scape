import { Children } from "react";
import Home from "../Components/Home";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import MyStories from "../Components/Story/MyStories";
import authRoutes from "./routes/auth";
import Story from "../Components/Story/Story";
import { createStory } from "./loader";

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
    path: "/story",
    element: <Story />,
    loader: createStory,
  },
  {
    path: "/myStories",
    element: <MyStories />,
  },
];

export default routes;
