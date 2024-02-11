import React from "react";
import { Client } from "../../Types/gql/graphql";
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

type ClientInfoProps = {
  client: Client | null;
};

const ClientInfo: React.FC<ClientInfoProps> = ({ client }) => {
  return (
    <>
      <h5 className="mt-5">Client Information</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon" /> {client?.name}
        </li>
        <li className="list-group-item">
          <FaEnvelope className="icon" /> {client?.email}
        </li>
        <li className="list-group-item">
          <FaPhone className="icon" /> {client?.phone}
        </li>
      </ul>
    </>
  );
};

export default ClientInfo;
