import fetch from "cross-fetch";
import { getIntrospectionQuery, buildClientSchema } from "graphql";

export const loader = async () => {
  const introspectionQuery = getIntrospectionQuery();

  const response = await fetch("http://localhost:5000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: introspectionQuery }),
  });

  const data = await response.json();

  return buildClientSchema(data.data);
};
