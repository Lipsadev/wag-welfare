import React, { useState } from "react";
import axios from "axios";

const HeroSection = () => {
  const [reporterName, setReporterName] = useState("");
  const [dogName, setDogName] = useState("");
  const [place, setPlace] = useState("");
  const [info, setInfo] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlgow7bhp/image/upload";
  const UPLOAD_PRESET = "pawrescue_upload";
  const BACKEND_URL = "https://wag-welfare-a0at.onrender.com/api/rescues";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reporterName || !dogName || !place || !info || !image) {
      alert("Please fill out all fields and select an image!");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudRes = await axios.post(CLOUDINARY_URL, formData);
      const imageUrl = cloudRes.data.secure_url;

      // 2️⃣ Send rescue data to backend
      const rescueData = {
        reporterName,
        dogName,
        place,
        imageUrl,
        info,
      };

      const res = await axios.post(BACKEND_URL, rescueData);
      console.log("✅ Rescue submitted:", res.data);

      alert("Rescue reported successfully!");
      setReporterName("");
      setDogName("");
      setPlace("");
      setInfo("");
      setImage(null);
      setPreview(null);
    } catch (err: any) {
      console.error("❌ Error submitting rescue:", err.response?.data || err.message);
      alert("Failed to submit rescue. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center text-center py-10 px-4 bg-orange-50">
      <h1 className="text-4xl font-bold mb-4">🐾 Report a Rescue</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full bg-white p-6 rounded-2xl shadow"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={reporterName}
          onChange={(e) => setReporterName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Dog Name"
          value={dogName}
          onChange={(e) => setDogName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Additional Information"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          className="border p-2 rounded"
        ></textarea>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Rescue"}
        </button>
      </form>
    </section>
  );
};

export default HeroSection;
