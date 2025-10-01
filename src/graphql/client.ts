import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuthStore } from "../stores/authStore";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
// import { decryptToken } from "../utils/crypto";

const uploadLink = createUploadLink({
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
      if ((err as any).message === "UNAUTHORIZED_ERROR") {
        const { logout } = useAuthStore.getState();
        logout();
        window.location.replace("/iniciar-sesion");
      }
    }
  }
});

if (!import.meta.env.VITE_GRAPHQL_URL) {
  throw new Error("VITE_GRAPHQL_URL is not defined");
}
// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_GRAPHQL_WS_URL,
    connectionParams: () => {
      const token = useAuthStore.getState().token;
      return {
        Authorization: token ? `Bearer ${token}` : "",
      };
    },
  })
);

// Split link to route queries/mutations to HTTP and subscriptions to WebSocket
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  errorLink.concat(authLink.concat(uploadLink))
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
