import { useEffect, useState } from "react";

interface Rescue {
  _id: string;
  dogName: string;
  place: string;
  info: string;
  image?: string;
  createdAt: string;
}

const RescueCards = () => {
  const [rescues, setRescues] = useState<Rescue[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRescues = async () => {
      try {
        const res = await fetch("https://wag-welfare-a0at.onrender.com/api/rescues");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        // Handle both array and object response
        const rescuesArray = Array.isArray(data) ? data : data.rescues || [];
        const sorted = rescuesArray.sort(
          (a: Rescue, b: Rescue) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRescues(sorted);
      } catch (err) {
        console.error("Error fetching rescues:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRescues();
  }, []);

  const displayed = showAll ? rescues : rescues.slice(0, 8);

  if (loading) {
    return <p className="text-center py-6 text-gray-500">Loading rescues...</p>;
  }

  if (rescues.length === 0) {
    return <p className="text-center py-6 text-gray-500">No rescues reported yet.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">🐶 Reported Rescues</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayed.map((rescue) => (
          <div
            key={rescue._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transform transition"
          >
            {rescue.image ? (
              <img
                src={`https://wag-welfare-a0at.onrender.com/uploads/${rescue.image}`}
                alt={rescue.dogName}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-1">{rescue.dogName}</h2>
              <p className="text-sm text-gray-500 mb-2">{rescue.place}</p>
              <p className="text-gray-700 line-clamp-3">{rescue.info}</p>
            </div>
          </div>
        ))}
      </div>

      {rescues.length > 8 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RescueCards;
