import { gql } from "../../Types/gql";

export const GETCLIENTS = gql(`
  query Clients {
    clients {
      id
      name
      email
      phone
    }
  }
`);
