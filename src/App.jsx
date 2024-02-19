import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div className=""></div>
      <div className="max-w-6xl mx-auto my-6">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
