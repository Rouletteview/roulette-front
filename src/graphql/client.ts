import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient as createWsClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { useAuthStore } from "../stores/authStore";
import { onError } from "@apollo/client/link/error";

// import { decryptToken } from "../utils/crypto";

const httpUri = "https://api.roulettesview.com/graphql";
const wsUri = "wss://api.roulettesview.com/graphql";

const httpLink = new HttpLink({
  uri: httpUri,
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

let link = errorLink.concat(authLink.concat(httpLink));

if (typeof window !== "undefined") {
  const wsLink = new GraphQLWsLink(
    createWsClient({
      url: wsUri,
      connectionAckWaitTimeout: 5000,
      lazy: true,
      keepAlive: 100000,
      connectionParams: async () => {
        const token = useAuthStore.getState().token;
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : ""
          },
        };
      },
    })
  );

  link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    errorLink.concat(authLink.concat(httpLink))
  );
}

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
