import { React, useEffect, useContext } from "react";
import { AuthContext } from "../authContext";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  console.log(user);

  const loggedOut = () => {
    logout();
  };

  if (!user) {
    return <></>;
  }

  return (
    <div>
      <div className="topNavigation">Home </div>
      <Link to={"/login"} onClick={loggedOut}>
        Logout
      </Link>
    </div>
  );
}

export default Home;
