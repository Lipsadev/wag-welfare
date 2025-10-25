import { useState } from "react";
import { toast } from "sonner";

interface VolunteerModalProps {
  onClose: () => void;
}

const VolunteerModal: React.FC<VolunteerModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    phone: "",
    availability: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Volunteer added successfully!");
        onClose(); // close modal
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error submitting volunteer form:", err);
      toast.error("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Join as Volunteer</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="place"
            placeholder="Your Place"
            value={formData.place}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="availability"
            placeholder="Availability (e.g. weekends)"
            value={formData.availability}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerModal;
