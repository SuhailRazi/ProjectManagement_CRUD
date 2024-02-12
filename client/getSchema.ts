import fetch from "cross-fetch";
import { getIntrospectionQuery, buildClientSchema } from "graphql";

export const loader = async () => {
  const introspectionQuery = getIntrospectionQuery();

  const response = await fetch("https://api-prjtmngnt.vercel.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: introspectionQuery }),
  });

  const data = await response.json();

  return buildClientSchema(data.data);
};
