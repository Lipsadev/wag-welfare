import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Users } from "lucide-react";
import heroImage from "@/assets/hero-dogs.jpg";
import { useAuth } from "../context/AuthContext";

const HeroSection = () => {
  const { user, token } = useAuth();

  const [rescueOpen, setRescueOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  const [rescueData, setRescueData] = useState({
    reporterName: "",
    dogName: "",
    place: "",
    description: "",
    image: null as File | null,
  });
  const [rescuePreview, setRescuePreview] = useState<string | null>(null);

  const [volunteerData, setVolunteerData] = useState({
    name: "",
    place: "",
    phone: "",
    availability: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [volunteerErrors, setVolunteerErrors] = useState({
    name: "",
    place: "",
    phone: "",
    availability: "",
  });

  useEffect(() => {
    if (!rescueData.image) {
      setRescuePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(rescueData.image);
    setRescuePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [rescueData.image]);

  const handleLoginRequired = () => {
    setShowLoginCard(true);
    setTimeout(() => setShowLoginCard(false), 2000);
  };

  const handleRescueClick = () => {
    if (!user) return handleLoginRequired();
    setRescueOpen(true);
  };

  const handleVolunteerClick = () => {
    if (!user) return handleLoginRequired();
    setVolunteerOpen(true);
  };

  // 🐶 CLOUDINARY UPLOAD + Rescue Submit
  const handleRescueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return handleLoginRequired();

    if (!rescueData.reporterName || !rescueData.dogName || !rescueData.place || !rescueData.description || !rescueData.image) {
      setMessage("All fields including image are required.");
      return;
    }

    try {
      setLoading(true);
      setMessage("Uploading image...");

      // Step 1: Upload image to Cloudinary
      const imgForm = new FormData();
      imgForm.append("file", rescueData.image);
      imgForm.append("upload_preset", "pawrescue_upload");

      const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/dlgow7bhp/image/upload`, {
        method: "POST",
        body: imgForm,
      });
      const cloudData = await cloudRes.json();

      if (!cloudData.secure_url) {
        console.error("Cloudinary Error:", cloudData);
        setMessage("❌ Failed to upload image. Check preset or network.");
        setLoading(false);
        return;
      }

      const imageUrl = cloudData.secure_url;

      // Step 2: Send rescue data to backend
      const res = await fetch("https://wag-welfare-a0at.onrender.com/api/rescues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reporterName: rescueData.reporterName,
          dogName: rescueData.dogName,
          place: rescueData.place,
          description: rescueData.description,
          image: imageUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Rescue reported successfully!");
        setRescueData({ reporterName: "", dogName: "", place: "", description: "", image: null });
        setRescueOpen(false);
      } else {
        console.error("Rescue POST failed:", data);
        setMessage("❌ Failed to report rescue. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error reporting rescue.");
    } finally {
      setLoading(false);
    }
  };

  // 👥 Volunteer Submit
  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = { name: "", place: "", phone: "", availability: "" };
    let hasError = false;

    if (!volunteerData.name.trim()) {
      errors.name = "Name is required.";
      hasError = true;
    }
    if (!volunteerData.place.trim()) {
      errors.place = "Place / Location is required.";
      hasError = true;
    }
    if (!volunteerData.phone.trim()) {
      errors.phone = "Phone Number is required.";
      hasError = true;
    } else if (!/^\d{10}$/.test(volunteerData.phone.trim())) {
      errors.phone = "Enter a valid 10-digit phone number.";
      hasError = true;
    }
    if (!volunteerData.availability.trim()) {
      errors.availability = "Availability is required.";
      hasError = true;
    }

    setVolunteerErrors(errors);
    if (hasError) return;

    try {
      setLoading(true);
      const res = await fetch("https://wag-welfare-a0at.onrender.com/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(volunteerData),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ Volunteer request submitted!");
        setVolunteerData({ name: "", place: "", phone: "", availability: "" });
        setVolunteerErrors({ name: "", place: "", phone: "", availability: "" });
        setVolunteerOpen(false);
      } else {
        setMessage("❌ Failed to submit volunteer request.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error submitting volunteer request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Happy rescued dogs" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Every Paw Deserves a{" "}
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Second Chance
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Connect rescuers, volunteers, and loving families to save stray dogs and give them the life they deserve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4 shadow-warm" onClick={handleRescueClick}>
              <Heart className="w-5 h-5 mr-2" /> Report a Rescue
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="text-lg px-8 py-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
              onClick={handleVolunteerClick}
            >
              <Users className="w-5 h-5 mr-2" /> Join as Volunteer
            </Button>
          </div>

          {message && <p className="mt-4 text-lg font-medium">{message}</p>}

          {showLoginCard && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-lg z-[3000] animate-login-card">
              Sign In / Sign Up required
            </div>
          )}
        </div>
      </div>

      {/* Rescue Form */}
      <Dialog open={rescueOpen} onOpenChange={setRescueOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Report a Rescue</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleRescueSubmit}>
            <Input type="text" placeholder="Your Name" value={rescueData.reporterName} onChange={(e) => setRescueData({ ...rescueData, reporterName: e.target.value })} required />
            <Input type="text" placeholder="Dog Name" value={rescueData.dogName} onChange={(e) => setRescueData({ ...rescueData, dogName: e.target.value })} required />
            <Input type="text" placeholder="Place / Location" value={rescueData.place} onChange={(e) => setRescueData({ ...rescueData, place: e.target.value })} required />
            <Input type="file" accept="image/*" onChange={(e) => setRescueData({ ...rescueData, image: e.target.files?.[0] || null })} required />
            {rescuePreview && <img src={rescuePreview} alt="Preview" className="w-full h-48 object-cover rounded-md mt-2" />}
            <Textarea placeholder="Additional Information" value={rescueData.description} onChange={(e) => setRescueData({ ...rescueData, description: e.target.value })} required />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Rescue"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Volunteer Form */}
      <Dialog open={volunteerOpen} onOpenChange={setVolunteerOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Join as Volunteer</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleVolunteerSubmit}>
            <Input type="text" placeholder="Your Name" value={volunteerData.name} onChange={(e) => setVolunteerData({ ...volunteerData, name: e.target.value })} required />
            <Input type="text" placeholder="Place / Location" value={volunteerData.place} onChange={(e) => setVolunteerData({ ...volunteerData, place: e.target.value })} required />
            <Input type="tel" placeholder="Phone Number" value={volunteerData.phone} onChange={(e) => setVolunteerData({ ...volunteerData, phone: e.target.value })} required />
            <Textarea placeholder="Availability (Days/Time you can help)" value={volunteerData.availability} onChange={(e) => setVolunteerData({ ...volunteerData, availability: e.target.value })} />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Volunteer Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <style>
        {`
          @keyframes loginCardZoom {
            0% { transform: translate(-50%, 0) scale(0.8); opacity: 0; }
            50% { transform: translate(-50%, 0) scale(1.05); opacity: 1; }
            100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
          }
          .animate-login-card {
            animation: loginCardZoom 0.3s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
