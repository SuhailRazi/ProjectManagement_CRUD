import { CodegenConfig } from "@graphql-codegen/cli";
import { loader } from "./getSchema";

const config: CodegenConfig = {
  schema: [
    {
      pgmngt: { loader: loader as unknown as string },
    },
  ],
  documents: ["src/**/*.ts?(x)"],
  generates: {
    "./src/Types/gql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};
export default config;
