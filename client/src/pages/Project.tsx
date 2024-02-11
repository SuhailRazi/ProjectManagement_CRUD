import { useQuery } from "@apollo/client";
import { GET_ONE_PROJECT } from "../GraphQl/Queries/projectQueries";
import { Spinner } from "../components/Spinner";
import { Link, useParams } from "react-router-dom";
import ClientInfo from "../components/Projects/ClientInfo";
import DeleteProjectButton from "../components/Projects/DeleteProjectButton";
import EditProjectForm from "../components/Projects/EditProjectForm";

const Project = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_ONE_PROJECT, {
    variables: {
      id: id ?? "0",
    },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong....</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{data?.project?.name}</h1>
          <p>{data?.project?.description}</p>
          <h5 className="mt-3">Project-Status</h5>
          <p className="lead">{data?.project?.status}</p>
          <ClientInfo client={data?.project?.client ?? null} />
          <EditProjectForm project={data?.project ?? null} />
          <DeleteProjectButton projectId={id ?? ""} />
        </div>
      )}
    </>
  );
};

export default Project;
