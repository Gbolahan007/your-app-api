import { useNavigate } from "react-router-dom";

const StickyButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contact-us");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 transition-all duration-300 ease-in-out">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8"></path>
          <path d="M8 12h8"></path>
        </svg>
        Chat Us
      </button>
    </div>
  );
};

export default StickyButton;
