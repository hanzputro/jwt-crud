import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const ENDPOINT_URL = import.meta.env.VERCEL_URL
  ? `https://${import.meta.env.VERCEL_URL}`
  : `http://localhost:4000/`;

console.log("ENDPOINT_URL:", ENDPOINT_URL);

const authLink = setContext((_, { header }) => {
  return {
    headers: {
      ...header,
      authorization: localStorage.getItem("token") || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(
    createHttpLink({
      uri: ENDPOINT_URL,
    })
  ),
  cache: new InMemoryCache(),
});

export default client;
