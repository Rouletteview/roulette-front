import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuthStore } from "../stores/authStore";
import { onError } from "@apollo/client/link/error";
// import { decryptToken } from "../utils/crypto";


const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = useAuthStore.getState().token;


  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((err as any).code === "UNAUTHORIZED_ERROR") {
        const { logout } = useAuthStore.getState();
        logout();
        window.location.replace("/iniciar-sesion");
      }
    }
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
