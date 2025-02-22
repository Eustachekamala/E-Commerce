import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col items-center justify-center text-center">
        <img
          src="https://img.freepik.com/free-vector/401-error-unauthorized-concept-illustration_114360-1924.jpg"
          alt="Unauthorized Access"
          className="w-full max-w-md h-auto rounded-full mb-4 animate-pulse"
        />
        <h1 className="text-xl md:text-4xl font-bold mb-4">
          Oops! Unauthorized Access
        </h1>
        <p className="text-sm md:text-2xl mb-6">
          You don&apos;t have permission to view this page. Please contact the administrator if you believe this is a mistake.
        </p>
        <button
          className="bg-[#1f1f1f] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
          onClick={() => navigate("/auth/login")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
