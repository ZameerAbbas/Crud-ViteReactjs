import "./App.css";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";

function App() {
  return (
    <div className="bg-[#242424]">
      <h1>Simple Crud in React js With axois </h1>
      <div>
        <div>
          <Create />
        </div>
        <div>
          <Read />
        </div>
        <div>
          {/* <Update /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
