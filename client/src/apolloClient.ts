import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const ENDPOINT_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/graphql`
  : `http://localhost:4000/api/graphql`;

const link = createHttpLink({
  uri: ENDPOINT_URL,
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
