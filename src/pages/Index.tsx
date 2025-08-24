import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import RescueSection from "@/components/RescueSection";
import AdoptionSection from "@/components/AdoptionSection";
import VolunteerSection from "@/components/VolunteerSection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <RescueSection />
      <AdoptionSection />
      <VolunteerSection />
      <DonationSection />
      <Footer />
    </div>
  );
};

export default Index;