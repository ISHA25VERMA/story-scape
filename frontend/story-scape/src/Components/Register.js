import { React, useState, useEffect, useContext } from "react";
import { AuthContext } from "../authContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../Graphql/mutation/auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const context = useContext(AuthContext);

  let navigate = useNavigate();

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    update(
      proxy,
      {
        data: {
          auth: { createNewUser: userData },
        },
      }
    ) {
      while (loading) {
        console.log("loading...");
      }
      context.login(userData);
      navigate("/");
    },
    variables: { input: { name, email, password } },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser();
  };
  return (
    <div>
      {success ? (
        "success"
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <label htmlFor="email">Password: </label>
            <input
              type="text"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <div>
              <button>Register</button>
              <Link to={"/"}>Login Instead?</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register;
