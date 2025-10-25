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

  useEffect(() => {
    const fetchRescues = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rescues");
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
      }
    };
    fetchRescues();
  }, []);

  const displayed = showAll ? rescues : rescues.slice(0, 8);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">🐶 Reported Rescues</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayed.map((rescue) => (
          <div
            key={rescue._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transform transition"
          >
            {rescue.image && (
              <img
                src={`http://localhost:5000/uploads/${rescue.image}`}
                alt={rescue.dogName}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-1">{rescue.dogName}</h2>
              <p className="text-sm text-gray-500 mb-2">{rescue.place}</p>
              <p className="text-gray-700">{rescue.info}</p>
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
