import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="text-3xl text-red-500 my-40 flex justify-center">
      <RingLoader color="#0608D4" />
    </div>
  );
};

export default Loading;
