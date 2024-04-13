import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../Graphql/mutation/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  function login() {
    // login mutation
    loginUser({ variables: { input: { email, password } } });
    if (data) {
      //get the token and redirect to home page
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
    //save toke to cache/local storage
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(e);
        }}
      >
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
          <Link to={"register"}>New User?</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
