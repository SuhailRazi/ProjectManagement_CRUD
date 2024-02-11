import React, { useState } from "react";
import * as yup from "yup";
import { Project, ProjectStatus } from "../../Types/gql/graphql";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UPDATE_PROJECT } from "../../GraphQl/Mutations/projectMutations";
import { useMutation } from "@apollo/client";

type EditProjectProps = {
  project: Project | null;
};

type InputTypes = yup.InferType<typeof schema>;

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const EditProjectForm: React.FC<EditProjectProps> = ({ project }) => {
  const [status, setStatus] = useState<ProjectStatus>();
  console.log(status);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: ["GetProjects"],
  });

  const { register, handleSubmit, reset } = useForm<InputTypes>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
    },
  });

  const onSubmit = async (data: InputTypes) => {
    try {
      const { name, description } = data;
      console.log("client added successfully");
      updateProject({
        variables: {
          id: project?.id ?? "0",
          name: name,
          description: description,
          status: status,
        },
      });

      reset();
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="mt-5">
      <h3> Update Project Details</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            {...register("name")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            {...register("description")}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            id=""
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          >
            <option value={ProjectStatus.New}>Not Started</option>
            <option value={ProjectStatus.Progress}>In Progress</option>
            <option value={ProjectStatus.Completed}>Completed</option>
          </select>
          <button className="btn btn-primary mt-3" type="submit">
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectForm;
