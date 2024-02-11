import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { Spinner } from "../Spinner";
import { GETCLIENTS } from "../../GraphQl/Queries/clientQueries";
// import { DELETE_CLIENT } from "../GraphQl/Mutations/clientMutations";

const Clients = () => {
  const { data, loading, error } = useQuery(GETCLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong....</p>;

  return (
    <div>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.clients?.length != 0 ? (
              data?.clients?.map((client) => (
                <ClientRow key={client?.id} clients={client} />
              ))
            ) : (
              <tr>
                <td>No data present</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Clients;
