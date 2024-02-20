import { Outlet } from "react-router-dom";
import { Navbar } from "./components";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-6 px-3">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
