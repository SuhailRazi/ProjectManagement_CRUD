import { gql } from "../../Types/gql";

export const DELETE_CLIENT = gql(`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id){
            id
            name
            email
            phone
        }
    }
`);
