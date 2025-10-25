import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Users } from "lucide-react";
import heroImage from "@/assets/hero-dogs.jpg";
import { useAuth } from "../context/AuthContext";

const HeroSection = () => {
  const { user } = useAuth();

  const [rescueOpen, setRescueOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  const [rescueData, setRescueData] = useState({
    name: "",
    dogName: "",
    place: "",
    info: "",
    image: null,
  });
  const [rescuePreview, setRescuePreview] = useState(null);

  const [volunteerData, setVolunteerData] = useState({
    name: "",
    place: "",
    phone: "",
    availability: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    if (!user) {
      handleLoginRequired();
      return;
    }
    setRescueOpen(true);
  };

  const handleVolunteerClick = () => {
    if (!user) {
      handleLoginRequired();
      return;
    }
    setVolunteerOpen(true);
  };

  const handleRescueSubmit = async (e) => { /* ...your existing rescue submit code... */ };
  const handleVolunteerSubmit = async (e) => { /* ...your existing volunteer submit code... */ };

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
            Connect rescuers, volunteers, and loving families to save stray dogs
            and give them the life they deserve.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-8 py-4 shadow-warm"
              onClick={handleRescueClick}
            >
              <Heart className="w-5 h-5 mr-2" />
              Report a Rescue
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="text-lg px-8 py-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
              onClick={handleVolunteerClick}
            >
              <Users className="w-5 h-5 mr-2" />
              Join as Volunteer
            </Button>
          </div>

          {message && <p className="mt-4 text-lg font-medium">{message}</p>}

          {/* Login Required Card with animation */}
          {showLoginCard && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-lg z-[3000] animate-login-card">
              Sign In / Sign Up required
            </div>
          )}
        </div>
      </div>

      {/* Rescue Form Modal */}
      <Dialog open={rescueOpen} onOpenChange={setRescueOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Report a Rescue</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleRescueSubmit}>
            <Input type="text" placeholder="Your Name" value={rescueData.name} onChange={(e) => setRescueData({ ...rescueData, name: e.target.value })} required />
            <Input type="text" placeholder="Dog Name" value={rescueData.dogName} onChange={(e) => setRescueData({ ...rescueData, dogName: e.target.value })} required />
            <Input type="text" placeholder="Place / Location" value={rescueData.place} onChange={(e) => setRescueData({ ...rescueData, place: e.target.value })} required />
            <Input type="file" accept="image/*" onChange={(e) => setRescueData({ ...rescueData, image: e.target.files?.[0] || null })} required />
            {rescuePreview && <img src={rescuePreview} alt="Preview" className="w-full h-48 object-cover rounded-md mt-2" />}
            <Textarea placeholder="Additional Information" value={rescueData.info} onChange={(e) => setRescueData({ ...rescueData, info: e.target.value })} required />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Rescue"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Volunteer Form Modal */}
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

      {/* CSS Animation */}
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
