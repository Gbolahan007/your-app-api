// pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      // This will parse the URL fragment and update the session
      const { error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
      } else {
        // Redirect back to homepage or dashboard
        navigate("/home");
      }
    };

    handleOAuthRedirect();
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center text-xl">
      Redirecting...
    </div>
  );
};

export default AuthCallback;
