import React from "react";
import { FaTrash } from "react-icons/fa";
import { Client } from "../Types/gql/graphql";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../GraphQl/Mutations/clientMutations";
import { GETCLIENTS } from "../GraphQl/Queries/clientQueries";

type ClientRowProps = {
  clients: Client | null;
};

const ClientRow: React.FC<ClientRowProps> = ({ clients }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: clients?.id as string },
    refetchQueries: [{ query: GETCLIENTS }],
    // More faster way by updating the cache
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GETCLIENTS });
    //   cache.writeQuery({
    //     query: GETCLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
    onCompleted: () => {
      console.log("Client deleted successfully");
    },
  });

  const handleDeleteClient = async () => {
    try {
      await deleteClient();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <tr>
      <td>{clients?.name}</td>
      <td>{clients?.email}</td>
      <td>{clients?.phone}</td>
      <td>
        <div className="btn btn-danger btn-sm">
          <FaTrash onClick={handleDeleteClient} />
        </div>
      </td>
    </tr>
  );
};

export default ClientRow;
