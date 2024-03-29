import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../GraphQl/Queries/projectQueries";
import { Spinner } from "../Spinner";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { data, loading, error } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong....</p>;

  return (
    <>
      {data?.projects?.length ?? 0 > 0 ? (
        <div className="row mt-4">
          {data?.projects?.map((project) => (
            <ProjectCard key={project?.id} projects={project} />
          ))}
        </div>
      ) : (
        <p>No projects present</p>
      )}
    </>
  );
};

export default Projects;
