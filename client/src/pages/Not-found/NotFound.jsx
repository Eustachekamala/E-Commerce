import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="m-auto flex flex-col items-center justify-center p-6 text-center">
      <img
        src="https://static.vecteezy.com/system/resources/previews/025/431/857/non_2x/404-page-with-screen-and-robot-under-high-voltage-vector.jpg"
        alt="Under Construction"
        className="w-full max-w-md h-auto mb-4 animate-pulse"
      />
      <h1 className="text-xl md:text-4xl font-bold mb-4">
        Oops! Page Under Construction
      </h1>
      <p className="text-sm md:text-2xl mb-6">
        We&apos;re working hard to bring you something amazing. Please check back soon!
      </p>
      <button
        className="bg-[#1f1f1f] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </div>
  );
}

export default NotFound;