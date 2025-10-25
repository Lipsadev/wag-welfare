import { Card } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";

const NGOSection = () => {
  const ngos = [
    {
      name: "Helping Paws Foundation",
      location: "Mumbai, MH",
      email: "contact@helpingpaws.org",
      phone: "+91 98765 43210",
    },
    {
      name: "Stray Friends NGO",
      location: "Delhi, DL",
      email: "info@strayfriends.org",
      phone: "+91 91234 56789",
    },
    {
      name: "Save Dogs India",
      location: "Bangalore, KA",
      email: "support@savedogs.in",
      phone: "+91 99887 66554",
    },
  ];

  return (
    <section id="ngo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            NGO Contacts
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with organizations actively working to rescue and care for stray dogs. Reach out directly to contribute or seek help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ngos.map((ngo, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-foreground mb-2">{ngo.name}</h3>
              <p className="text-sm text-muted-foreground mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> {ngo.location}
              </p>
              <p className="text-sm text-muted-foreground mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2" /> {ngo.email}
              </p>
              <p className="text-sm text-muted-foreground flex items-center">
                <Phone className="w-4 h-4 mr-2" /> {ngo.phone}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NGOSection;
