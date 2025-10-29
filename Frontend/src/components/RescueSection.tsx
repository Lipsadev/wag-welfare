import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Rescue {
  _id: string;
  dogName: string;
  reporterName: string;
  place: string;
  info: string;
  image?: string;
  adoptionCount?: number;
}

const RescueSection = () => {
  const [rescues, setRescues] = useState<Rescue[]>([]);
  const [rescueData, setRescueData] = useState({
    name: "",
    place: "",
    info: "",
    image: null as File | null,
  });
  const [rescuePreview, setRescuePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all rescues
  const fetchRescues = async () => {
    try {
      const res = await fetch("https://wag-welfare-a0at.onrender.com/api/rescues");
      if (!res.ok) throw new Error("Failed to fetch rescues");
      const data = await res.json();
      setRescues(data.rescues || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRescues();
  }, []);

  // Preview image
  useEffect(() => {
    if (!rescueData.image) return setRescuePreview(null);
    const objectUrl = URL.createObjectURL(rescueData.image);
    setRescuePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [rescueData.image]);

  // Submit new rescue
  const handleRescueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setMessage("❌ You must be logged in to report a rescue");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("dogName", rescueData.name);
      formData.append("reporterName", rescueData.name);
      formData.append("place", rescueData.place);
      formData.append("info", rescueData.info);
      if (rescueData.image) formData.append("image", rescueData.image);

      const res = await fetch("https://wag-welfare-a0at.onrender.com/api/rescues", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit rescue");
      const data = await res.json();

      setRescues([data.rescue, ...rescues]);
      setMessage("✅ Rescue reported successfully!");
      setRescueData({ name: "", place: "", info: "", image: null });
      setRescuePreview(null);
    } catch (err: any) {
      console.error(err);
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rescue" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">🐶 Recent Rescues</h2>

        {/* Rescue Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {rescues.length === 0 ? (
            <p className="text-gray-500 col-span-3">No rescues reported yet.</p>
          ) : (
            rescues.map((rescue) => (
              <div
                key={rescue._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
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
                <div className="p-4 text-left">
                  <h3 className="font-bold text-xl mb-2">{rescue.dogName}</h3>
                  <p className="text-gray-600 mb-1">
                    Reported by: {rescue.reporterName}
                  </p>
                  <p className="text-gray-600 mb-1">{rescue.place}</p>
                  <p className="text-gray-700 mb-2">{rescue.info}</p>
                  <p className="text-sm text-gray-500">
                    Adoption Count: {rescue.adoptionCount || 0}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Report Rescue Form */}
        <h2 className="text-2xl font-bold mb-4">Report a Rescue</h2>
        <form
          className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleRescueSubmit}
        >
          <Input
            type="text"
            placeholder="Your Name"
            className="w-full mb-4"
            value={rescueData.name}
            onChange={(e) =>
              setRescueData({ ...rescueData, name: e.target.value })
            }
            required
          />
          <Input
            type="text"
            placeholder="Place"
            className="w-full mb-4"
            value={rescueData.place}
            onChange={(e) =>
              setRescueData({ ...rescueData, place: e.target.value })
            }
            required
          />
          <Textarea
            placeholder="Additional Info"
            className="w-full mb-4"
            value={rescueData.info}
            onChange={(e) =>
              setRescueData({ ...rescueData, info: e.target.value })
            }
            required
          />
          <Input
            type="file"
            className="w-full mb-4"
            onChange={(e) =>
              setRescueData({ ...rescueData, image: e.target.files?.[0] || null })
            }
          />
          {rescuePreview && (
            <img
              src={rescuePreview}
              alt="Preview"
              className="w-full h-48 object-cover mb-4"
            />
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Rescue"}
          </Button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    </section>
  );
};

export default RescueSection;
