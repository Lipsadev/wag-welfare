import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface RescueModalProps {
  onClose: () => void;
  onRescueAdded: () => void; // callback to refresh dashboard
}

const RescueModal: React.FC<RescueModalProps> = ({ onClose, onRescueAdded }) => {
  const { user, token } = useAuth();

  const [dogName, setDogName] = useState("");
  const [place, setPlace] = useState("");
  const [info, setInfo] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage("❌ You must be logged in to report a rescue.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("dogName", dogName);
      formData.append("reporterName", user?.name || dogName);
      formData.append("place", place);
      formData.append("info", info);
      if (type) formData.append("type", type);
      if (age) formData.append("age", age);
      if (size) formData.append("size", size);
      if (breed) formData.append("breed", breed);
      if (image) formData.append("image", image);

      const res = await axios.post("http://localhost:5000/api/rescues", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setMessage("✅ Rescue reported successfully!");

        // Clear form
        setDogName("");
        setPlace("");
        setInfo("");
        setType("");
        setAge("");
        setSize("");
        setBreed("");
        setImage(null);

        // Notify parent to refresh dashboard or list
        onRescueAdded();
        onClose();
      }
    } catch (err: any) {
      console.error("Error reporting rescue:", err);
      setMessage(err.response?.data?.message || "❌ Failed to report rescue.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Report a Rescue</h2>
        {message && <p className="mb-2 text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Dog Name"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Info / Description"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="w-full"
          />

          <button
            type="submit"
            className="w-full p-2 bg-green-400 text-white font-semibold rounded hover:bg-green-500"
          >
            Submit Rescue
          </button>
        </form>
      </div>
    </div>
  );
};

export default RescueModal;
