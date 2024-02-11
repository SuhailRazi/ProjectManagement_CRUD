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
