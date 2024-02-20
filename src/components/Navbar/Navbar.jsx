import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-gray-900 sticky top-0">
        <div className=" max-w-6xl mx-auto py-4 px-3">
            <Link to="/" className="text-white text-2xl md:text-3xl flex items-center space-x-2"><FaGithub /> <span className="">GitHub Issues</span></Link>
        </div>
    </div>
  );
}

export default Navbar;
