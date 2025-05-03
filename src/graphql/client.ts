import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useAuthStore } from "../stores/authStore";
const token = useAuthStore.getState().token;

const client = new ApolloClient({

  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default client;