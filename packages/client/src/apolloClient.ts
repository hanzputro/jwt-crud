import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const ENDPOINT_URL = import.meta.env.VITE_VERCEL_URL
  ? `https://${import.meta.env.VITE_VERCEL_URL}`
  : `http://localhost:4000`;

console.log("ENDPOINT_URL:", ENDPOINT_URL);

const link = createHttpLink({
  uri: ENDPOINT_URL,
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
