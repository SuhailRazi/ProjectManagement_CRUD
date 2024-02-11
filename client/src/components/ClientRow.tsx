import React from "react";
import { Client } from "../__generated__/graphql";
import { FaTrash } from "react-icons/fa";

type ClientRowProps = {
  clients: Client | null;
  deleteFunction: (id: string) => void;
};

const ClientRow: React.FC<ClientRowProps> = ({ clients, deleteFunction }) => {
  const handleDeleteClick = () => {
    if (clients?.id) {
      deleteFunction(clients.id);
    }
  };
  return (
    <tr>
      <td>{clients?.name}</td>
      <td>{clients?.email}</td>
      <td>{clients?.phone}</td>
      <td>
        <div className="btn btn-danger btn-sm">
          <FaTrash onClick={handleDeleteClick} />
        </div>
      </td>
    </tr>
  );
};

export default ClientRow;
