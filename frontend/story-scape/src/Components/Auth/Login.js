import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState, Component } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext.js";
import { LOGIN_USER } from "../../Graphql/mutation/auth.js";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { context } = useContext(AuthContext);
  let navigate = useNavigate();
  console.log(context);
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    update(
      proxy,
      {
        data: {
          auth: { loginUser: userData },
        },
      }
    ) {
      while (loading) {
        console.log("loading...");
      }
      context.login(userData);
      navigate("/");
    },
    variables: { input: { email, password } },
    context,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <div>
          <button type="submit">Login</button>
          <Link to={"/register"}>New User?</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
