import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../../GraphQl/Mutations/projectMutations";
import { useNavigate } from "react-router-dom";

type DeleteProjectButtonProps = {
  projectId: string;
};
const DeleteProjectButton: React.FC<DeleteProjectButtonProps> = ({
  projectId,
}) => {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id: projectId,
    },
    onCompleted: () => {
      navigate("/");
    },
  });
  const handeleDelete = () => {
    deleteProject();
  };

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={handeleDelete}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
