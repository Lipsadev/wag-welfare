import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner"; // using your existing toast setup

/**
 * useRequireAuth - custom hook to ensure the user is logged in before performing an action
 * @returns {Function} a wrapper that checks authentication before running a callback
 */
export const useRequireAuth = () => {
  const { user } = useAuth();

  const requireAuth = (action: () => void) => {
    if (!user) {
      toast.error("You need to Sign up / Log in first!");
      return;
    }
    action();
  };

  return { requireAuth };
};
