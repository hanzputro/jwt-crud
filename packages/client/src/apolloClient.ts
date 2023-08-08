import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const ENDPOINT_URL = import.meta.env.VITE_VERCEL_URL
  ? `https://${import.meta.env.VITE_VERCEL_URL}/graphql`
  : `http://localhost:4000/graphql`;

console.log("ENDPOINT_URL:", ENDPOINT_URL, import.meta.env.VITE_VERCEL_URL);

const link = createHttpLink({
  uri: ENDPOINT_URL,
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
