import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthModal from "./components/AuthModal";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-warm to-primary-soft text-white font-bold flex items-center justify-center shadow-md hover:scale-105 transition"
      >
        {user.name?.charAt(0).toUpperCase() || "U"}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-2xl p-4 flex flex-col gap-3 z-50 border border-gray-100 animate-fadeIn">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-warm to-primary-soft text-white flex items-center justify-center font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            className="px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md text-left"
            onClick={() => {
              setOpen(false);
              navigate("/dashboard");
            }}
          >
            Dashboard
          </button>
          <button
            className="px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md text-left"
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
          >
            My Profile
          </button>
          <button
            className="px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md text-left"
            onClick={() => {
              setOpen(false);
              logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

// ------------------ Dashboard ------------------
interface Rescue {
  _id: string;
  dogName: string;
  place: string;
  info: string;
  status: "Pending" | "Resolved" | string;
  createdAt: string;
}

const Dashboard = () => {
  const { user } = useAuth();

  const { data: rescues, isLoading, error } = useQuery<Rescue[]>({
    queryKey: ["userRescues", user?._id],
    queryFn: async () => {
      const res = await axios.get(`https://wag-welfare-a0at.onrender.com/api/rescue/user/${user._id}`);
      return res.data.rescues || [];
    },
    enabled: !!user,
  });

  if (isLoading) return <div className="p-8 text-gray-600 text-center">Loading your rescues...</div>;
  if (error) return <div className="p-8 text-red-600 text-center">Failed to load rescue data.</div>;

  const totalRescues = rescues?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome back, {user.name} 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">Total Rescues</h2>
          <p className="text-4xl font-bold text-primary mt-2">{totalRescues}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Rescue Submissions</h2>

        {totalRescues > 0 ? (
          <ul className="space-y-4">
            {rescues.map((r) => (
              <li
                key={r._id}
                className="p-4 border rounded-xl flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">🐾 {r.dogName} — {r.place}</p>
                  <p className="text-sm text-gray-500">Submitted: {new Date(r.createdAt).toLocaleString()}</p>
                </div>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    r.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : r.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {r.status || "Unknown"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You haven’t submitted any rescues yet.</p>
        )}
      </div>
    </div>
  );
};

// ------------------ App ------------------
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <div className="fixed top-4 right-4 z-[1000] flex gap-2 items-center">
            {!user ? (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-primary-warm to-primary-soft text-white font-semibold px-4 py-2 rounded-[var(--radius)] hover:opacity-90 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="bg-gradient-to-r from-primary-warm to-primary-soft text-white font-semibold px-4 py-2 rounded-[var(--radius)] hover:opacity-90 transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <UserMenu />
            )}
          </div>

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/profile"
              element={<div className="p-8 text-xl font-semibold">My Profile Page</div>}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {showLogin && <AuthModal type="login" onClose={() => setShowLogin(false)} />}
          {showSignup && <AuthModal type="signup" onClose={() => setShowSignup(false)} />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
