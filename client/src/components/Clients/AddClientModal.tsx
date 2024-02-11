import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../../GraphQl/Mutations/clientMutations";

type InputTypes = yup.InferType<typeof schema>;

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().required("Email is required"),
});

const AddClientModal = () => {
  const { register, handleSubmit, reset } = useForm<InputTypes>({
    resolver: yupResolver(schema),
  });

  const [addClient] = useMutation(ADD_CLIENT, {
    refetchQueries: ["Clients"],
    // update(cache, { data }) {
    //   const addedClient = data?.addClient;

    //   if (addedClient) {
    //     const existingClients =
    //       cache.readQuery<ClientsQuery>({ query: GETCLIENTS })?.clients ?? [];

    //     cache.writeQuery<ClientsQuery>({
    //       query: GETCLIENTS,
    //       data: { clients: [...existingClients, addedClient] },
    //     });
    //   }
    // },
  });

  const onSubmit = async (data: InputTypes) => {
    try {
      const { name, email, phone } = data;
      await addClient({
        variables: { name, email, phone },
      });
      console.log("client added successfully");

      reset();
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addClientModel"
        >
          <div className="d-flex align-items-center ">
            <FaUser type="icon" className="me-2" />
            <div>Add Client</div>
          </div>
        </button>
      </div>

      <div
        className="modal fade"
        id="addClientModel"
        aria-labelledby="AddClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="AddClientModalLabel">
                Add Client
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
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register("email")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    {...register("phone")}
                  />
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
  );
};

export default AddClientModal;
