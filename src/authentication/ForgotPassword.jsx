import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useResetPassword } from "../authentication/useResetPassword"; // Custom hook to handle password reset logic
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi"; // Assuming you use this icon for the loading state

const ForgotPassword = () => {
  const { token } = useParams(); // You might need to handle a token from the URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const { resetPassword, isLoading } = useResetPassword();

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pass the token (from the URL) and newPassword to the resetPassword mutation
      await resetPassword({ token, password: newPassword });
      navigate("/signup"); // Redirect to login after successful password reset
    } catch (error) {
      // The error will be handled by the onError callback in the useMutation hook
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Update Your Password</h1>
          <p className="mt-2 text-sm text-gray-600">Enter your new password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {isLoading ? (
              <BiLoaderAlt className="h-5 w-5 animate-spin" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
