import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <form>
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
          <button>Login</button>
          <Link to={"register"}>New User?</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
