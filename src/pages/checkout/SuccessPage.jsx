import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearItem } from "../../cart/cartSlice";

const SuccessPage = ({ email, total, formatCurrency }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mb-6 text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="mb-4 text-2xl font-bold">Payment Successful!</h2>
        <p className="mb-6 text-gray-600">
          Your order has been placed and will be processed soon.
        </p>
        <p className="mb-6 font-semibold text-gray-800">
          Order Total: {formatCurrency(total)}
        </p>
        <p className="mb-2 text-gray-600">
          A confirmation email has been sent to:
        </p>
        <p className="font-medium text-gray-800">{email}</p>
        <button
          className="mt-8 w-full rounded-lg bg-blue-600 py-3 text-white transition-colors hover:bg-blue-700"
          onClick={() => {
            navigate("/products");
            dispatch(clearItem());
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
