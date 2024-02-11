import AddClientModal from "../components/Clients/AddClientModal";
import Clients from "../components/Clients/Clients";
import AddProjectModel from "../components/Projects/AddProjectModal";
import Projects from "../components/Projects/Projects";

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModel />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
};

export default Home;
