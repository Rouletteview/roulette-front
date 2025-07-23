import { CodegenConfig } from "@graphql-codegen/cli";
import 'dotenv/config';

const config: CodegenConfig = {
  schema:
    process.env.VITE_GRAPHQL_URL,
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/graphql/generated/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
