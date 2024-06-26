import { jwtDecode } from "jwt-decode";
import { createContext, useReducer } from "react";

const initialState = {
  user: null,
};

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

if (localStorage.getItem("token")) {
  const decodeToken = jwtDecode(localStorage.getItem("token"));

  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodeToken;
  }
}

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("token", userData?.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  function logout() {
    localStorage.removeItem("token");
    dispatch("LOGOUT");
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
