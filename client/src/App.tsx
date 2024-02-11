import AddClientModal from "./components/Clients/AddClientModal";
import Clients from "./components/Clients/Clients";
import Header from "./components/Header";
import Projects from "./components/Projects/Projects";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <AddClientModal />
        <Projects />
        <Clients />
      </div>
    </>
  );
}

export default App;
