import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Rescue {
  _id: string;
  reporterName: string;
  dogName: string;
  place: string;
  info: string;
  image: string;
  createdAt: string;
}

interface Adoption {
  _id: string;
  adopterName: string;
  dogName: string;
  contact: string;
  message: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const { user, token, isLoading: authLoading } = useAuth();
  const [rescues, setRescues] = useState<Rescue[]>([]);
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }

        const [rescueRes, adoptionRes] = await Promise.all([
          axios.get("https://wag-welfare-a0at.onrender.com/api/rescues", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://wag-welfare-a0at.onrender.com/api/adoptions", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setRescues(rescueRes.data);
        setAdoptions(adoptionRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Dashboard
      </h1>

      {/* ✅ Rescues Table */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Reported Rescues
        </h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
          <table className="min-w-full border-collapse">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-3 px-4 border">Dog Name</th>
                <th className="py-3 px-4 border">Reporter</th>
                <th className="py-3 px-4 border">Place</th>
                <th className="py-3 px-4 border">Info</th>
                <th className="py-3 px-4 border">Image</th>
                <th className="py-3 px-4 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {rescues.length > 0 ? (
                rescues.map((r) => (
                  <tr key={r._id} className="text-center hover:bg-gray-50">
                    <td className="py-2 px-4 border">{r.dogName}</td>
                    <td className="py-2 px-4 border">{r.reporterName}</td>
                    <td className="py-2 px-4 border">{r.place}</td>
                    <td className="py-2 px-4 border">{r.info}</td>
                    <td className="py-2 px-4 border">
                      <img
                        src={`https://wag-welfare-a0at.onrender.com/${r.image}`}
                        alt={r.dogName}
                        className="h-16 w-16 object-cover rounded-lg mx-auto"
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-gray-500">
                    No rescues reported yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Adoption Requests Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Adoption Requests
        </h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
          <table className="min-w-full border-collapse">
            <thead className="bg-green-100">
              <tr>
                <th className="py-3 px-4 border">Dog Name</th>
                <th className="py-3 px-4 border">Adopter Name</th>
                <th className="py-3 px-4 border">Contact</th>
                <th className="py-3 px-4 border">Message</th>
                <th className="py-3 px-4 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {adoptions.length > 0 ? (
                adoptions.map((a) => (
                  <tr key={a._id} className="text-center hover:bg-gray-50">
                    <td className="py-2 px-4 border">{a.dogName}</td>
                    <td className="py-2 px-4 border">{a.adopterName}</td>
                    <td className="py-2 px-4 border">{a.contact}</td>
                    <td className="py-2 px-4 border">{a.message}</td>
                    <td className="py-2 px-4 border">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-gray-500">
                    No adoption requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
