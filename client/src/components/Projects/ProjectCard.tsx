import React from "react";
import { Project } from "../../Types/gql/graphql";

type ProjectCardProps = {
  projects: Project | null;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ projects }) => {
  return (
    <div className="col-md-6">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{projects?.name}</h5>
            <a className="btn btn-light" href={`/${projects?.id}`}>
              View
            </a>
          </div>
          <p className="small">
            Status: <strong>{projects?.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
