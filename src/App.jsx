import { Outlet } from "react-router-dom";
import { Navbar } from "./components";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className=""></div>
      <div className="max-w-6xl mx-auto my-6">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
