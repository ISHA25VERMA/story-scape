//setting up react router and apolloe client for graphql interations

import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  ApolloProvider,
  ApolloLink,
  concat,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import { AuthProvider } from "./authContext";

const errorLink = onError(({ graphqlErrors, networkErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(
        `graphql error: ${message}, location: ${location}, path: ${path}`
      );
    });
  }
});

const httpLink = new HttpLink({ uri: "http://localhost:4000/" });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  operation.setContext({ headers: { authorization: token ? token : "" } });
  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
console.log(routes);
const router = createBrowserRouter(routes, { basename: "/story-scape" });

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
