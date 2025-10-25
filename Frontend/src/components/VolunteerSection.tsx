import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Globe } from "lucide-react";

const NGOs = [
  {
    name: "Red Paws Rescue",
    location: "New Delhi",
    focus: "Sterilization, adoption, shelter for abandoned pets, and public awareness",
    website: "redpawsrescue.com",
  },
  {
    name: "Stray Animal Foundation India (SAFI)",
    location: "National",
    focus: "Improves stray animal lives through shelter, rescue, rehabilitation, and adoption",
    website: "strayanimalfoundationindia.org",
  },
  {
    name: "Dharamsala Animal Rescue (DAR)",
    location: "Dharamsala, Himachal Pradesh",
    focus: "Street animal rescue, medical care, rabies vaccination, and community education",
    website: "dharamsalaanimalrescue.org",
  },
  {
    name: "Friendicoes SECA",
    location: "New Delhi",
    focus: "Shelter, adoption, emergency rescue, and veterinary hospital",
    website: "friendicoes.org",
  },
  {
    name: "Animal Aid Unlimited",
    location: "Udaipur, Rajasthan",
    focus: "Rescues and treats over 15,000 injured street animals annually",
    website: "animalaidunlimited.org",
  },
  {
    name: "The Voice of Stray Dogs (VOSD)",
    location: "Bengaluru",
    focus: "Rescue, rehabilitation, and housing of stray dogs; operates one of India's largest shelters",
    website: "vosd.in",
  },
  {
    name: "People for Animals (PFA)",
    location: "New Delhi",
    focus: "Rescue operations, shelters, veterinary hospitals, sterilization programs, education, and legal advocacy",
    website: "peopleforanimalsindia.org",
  },
  {
    name: "Blue Cross of India",
    location: "Chennai",
    focus: "First to implement Animal Birth Control (ABC) and Anti-Rabies (AR) programs; operates shelters, clinics, and rescue services",
    website: "bluecrossofindia.org",
  },
];

const NGOSection = () => {
  const [showMore, setShowMore] = useState(false);

  const initialNGOs = NGOs.slice(0, 3);
  const remainingNGOs = NGOs.slice(3);

  return (
    <section id="ngo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Connect with Local NGOs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Support and connect with organizations actively working to rescue and care for stray dogs.
          </p>
        </div>

        {/* NGO Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
          {initialNGOs.map((ngo, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                {ngo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{ngo.name}</h3>
              <p className="text-sm text-muted-foreground mb-1 flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-1" />
                {ngo.location}
              </p>
              <p className="text-sm text-muted-foreground mb-3">{ngo.focus}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => window.open(`https://${ngo.website}`, "_blank")}
              >
                <Globe className="w-4 h-4 mr-2" /> Visit Website
              </Button>
            </Card>
          ))}

          {/* Remaining NGOs, shown only when showMore is true */}
          {showMore &&
            remainingNGOs.map((ngo, index) => (
              <Card key={index + 3} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {ngo.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{ngo.name}</h3>
                <p className="text-sm text-muted-foreground mb-1 flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {ngo.location}
                </p>
                <p className="text-sm text-muted-foreground mb-3">{ngo.focus}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => window.open(`https://${ngo.website}`, "_blank")}
                >
                  <Globe className="w-4 h-4 mr-2" /> Visit Website
                </Button>
              </Card>
            ))}
        </div>

        {/* View More / View Less Button */}
        {remainingNGOs.length > 0 && (
          <div className="text-center">
            <Button onClick={() => setShowMore(!showMore)}>
              {showMore ? "View Less" : "View More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NGOSection;
