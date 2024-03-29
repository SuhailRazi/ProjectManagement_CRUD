import { gql } from "../../Types/gql";

export const ADD_PROJECT = gql(`
    mutation AddProject($name: String! , $description: String!, $status: ProjectStatus!, $clientId: ID!){
        addProject(name: $name , description:  $description, status: $status, clientId:  $clientId){
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

export const DELETE_PROJECT = gql(`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id){
            id
            name
            status
        }
    }
`);

export const UPDATE_PROJECT = gql(`
    mutation UpdateProject($id: ID!,$name: String , $description: String, $status: UpdateProjectStatus){
        updateProject(id: $id,name: $name , description:  $description, status: $status){
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
