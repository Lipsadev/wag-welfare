import { useState, useEffect } from "react";

interface Rescue {
  _id: string;
  name: string;
  place: string;
  info: string;
  image: string | null;
  createdAt: string;
}

interface Volunteer {
  _id: string;
  name: string;
  place: string;
  phone: string;
  availability: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [tab, setTab] = useState<"rescues" | "volunteers">("rescues");
  const [rescues, setRescues] = useState<Rescue[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (tab === "rescues") {
          const res = await fetch("http://localhost:5000/api/rescues");
          const data = await res.json();
          if (data.success) setRescues(data.rescues);
        } else {
          const res = await fetch("http://localhost:5000/api/volunteers");
          const data = await res.json();
          if (data.success) setVolunteers(data.volunteers);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tab]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            tab === "rescues" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("rescues")}
        >
          Rescues
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "volunteers" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("volunteers")}
        >
          Volunteers
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : tab === "rescues" ? (
        rescues.length === 0 ? (
          <p className="text-center">No rescues reported yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {rescues.map((rescue) => (
              <div key={rescue._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {rescue.image && (
                  <img
                    src={`http://localhost:5000/uploads/${rescue.image}`}
                    alt={rescue.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-xl">{rescue.name}</h3>
                  <p className="text-gray-600">{rescue.place}</p>
                  <p className="mt-2">{rescue.info}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Reported: {new Date(rescue.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      ) : volunteers.length === 0 ? (
        <p className="text-center">No volunteers yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {volunteers.map((vol) => (
            <div key={vol._id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-bold text-xl">{vol.name}</h3>
              <p className="text-gray-600">Place: {vol.place}</p>
              <p className="text-gray-600">Phone: {vol.phone}</p>
              {vol.availability && <p className="text-gray-600">Availability: {vol.availability}</p>}
              <p className="text-gray-400 text-sm mt-2">
                Joined: {new Date(vol.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
