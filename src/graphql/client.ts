import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://zdbuyzv6va.execute-api.us-east-1.amazonaws.com/default/graphql",
    cache: new InMemoryCache(),
});

export default client;