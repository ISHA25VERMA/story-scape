//setting up react router and apolloe client for graphql interations

import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  ApolloProvider,
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

const apiUrl = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: apiUrl,
});

const router = createBrowserRouter(routes);

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
