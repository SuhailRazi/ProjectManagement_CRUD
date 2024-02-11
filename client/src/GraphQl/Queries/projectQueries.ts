import { gql } from "../../Types/gql";

export const GET_PROJECTS = gql(`
    query GetProjects {
        projects {
            id
            name
            status
        }
    }
`);

export const GET_ONE_PROJECT = gql(`
    query GetProject($id: ID!){
        project(id: $id){
            id
            name
            status
            description
            client{
                id
                name
                email
                phone
            }
        }
    }
`);
