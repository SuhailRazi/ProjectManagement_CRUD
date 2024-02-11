import { useForm } from "react-hook-form";
import { FaList } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { GETCLIENTS } from "../../GraphQl/Queries/clientQueries";
import { Spinner } from "../Spinner";
import { ADD_PROJECT } from "../../GraphQl/Mutations/projectMutations";
import { ProjectStatus } from "../../Types/gql/graphql";

type InputTypes = yup.InferType<typeof schema>;

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const AddProjectModel = () => {
  const [status, setStatus] = useState<ProjectStatus>(ProjectStatus.New);
  const [clientId, setClientId] = useState("new");
  const { data: clientData, loading, error } = useQuery(GETCLIENTS);
  const [addProject] = useMutation(ADD_PROJECT, {
    refetchQueries: ["GetProjects"],
  });

  const { register, handleSubmit, reset } = useForm<InputTypes>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: InputTypes) => {
    try {
      const { name, description } = data;
      console.log("client added successfully");
      addProject({
        variables: {
          name,
          description,
          status,
          clientId,
        },
      });

      reset();
    } catch (err) {
      console.log("error", err);
    }
  };

  if (loading) return <Spinner />;
  if (error) return "Something went wrong";

  return (
    <>
      {!loading && !error && (
        <>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addProjectModel"
            >
              <div className="d-flex align-items-center ">
                <FaList type="icon" className="me-2" />
                <div>New Project</div>
              </div>
            </button>
          </div>

          <div
            className="modal fade"
            id="addProjectModel"
            aria-labelledby="AddPojectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="AddPojectModalLabel">
                    Add Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
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
                        onChange={(e) =>
                          setStatus(e.target.value as ProjectStatus)
                        }
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        name="clientId"
                        className="form-select"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="">Select Client</option>
                        {clientData?.clients?.map((client) => (
                          <option value={client?.id ?? ""}>
                            {client?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="btn btn-info"
                      data-bs-dismiss="modal"
                      type="submit"
                    >
                      Submit
                    </button>
                    <button className="btn btn-error" type="reset">
                      Reset
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProjectModel;
