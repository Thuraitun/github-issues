import { Link } from "react-router-dom";
import Image from "../../assets/images/404.png";

const NoFound = () => {
  return (
    <div className=" my-20 md:my-32">
        <div className="flex justify-center">
            <img src={Image} alt="" />
        </div>
        <div className="flex justify-center">
            <Link to="/" className="py-2 px-4 bg-gray-900 rounded-lg text-white">Go to back</Link>
        </div>
    </div>
  );
}

export default NoFound;
