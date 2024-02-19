import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-900">
        <div className=" max-w-6xl mx-auto py-4">
            <Link to="/" className="text-white">Home</Link>
        </div>
    </div>
  );
}

export default Navbar;
