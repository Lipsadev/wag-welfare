import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import RescueList from "@/components/RescueList"; // updated
import AdoptionSection from "@/components/AdoptionSection";
import VolunteerSection from "@/components/VolunteerSection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";
import ChatBubble from "@/components/ChatBubble";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <RescueList /> {/* replaced RescueSection with dynamic list */}
      <AdoptionSection />
      <VolunteerSection />
      <DonationSection />
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Index;
