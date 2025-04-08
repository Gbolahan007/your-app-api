import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/signup")}
      className="rounded-lg bg-green-500 px-6 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
    >
      Login
    </button>
  );
}

export default Login;
