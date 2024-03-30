import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orgId, setOrgId] = useState("");
  const [role, setRole] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("here");
    console.log(name);
    setSuccess(true);
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
            <label htmlFor="orgId">Org Id: </label>
            <input
              type="text"
              id="orgId"
              onChange={(e) => setOrgId(e.target.value)}
              required
            ></input>
            <label htmlFor="role">Role: </label>
            <select id="role" onChange={(e) => setRole(e.target.value)}>
              <optgroup label="choose role">
                <option>ADMIN</option>
                <option>DEVELOPER</option>
                <option>USER</option>
              </optgroup>
            </select>
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
