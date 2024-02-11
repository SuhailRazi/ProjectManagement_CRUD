import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../../GraphQl/Mutations/clientMutations";
import { Client } from "../../Types/gql/graphql";

type ClientRowProps = {
  clients: Client | null;
};

const ClientRow: React.FC<ClientRowProps> = ({ clients }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: clients?.id as string },
    refetchQueries: ["Clients"],
    // // More faster way by updating the cache
    // update(cache, { data }) {
    //   const deletedClientId = data?.deleteClient?.id;
    //   if (deletedClientId) {
    //     const cachedData = cache.readQuery<ClientsQuery>({ query: GETCLIENTS });
    //     if (cachedData) {
    //       cache.writeQuery<ClientsQuery>({
    //         query: GETCLIENTS,
    //         data: {
    //           clients: cachedData?.clients?.filter(
    //             (client) => client?.id !== deletedClientId
    //           ),
    //         },
    //       });
    //     }
    //   }
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
