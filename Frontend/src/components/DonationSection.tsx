import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Heart, Truck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const impactStats = [
  { icon: Heart, label: "Dogs Fed", value: "1,250", color: "primary" },
  { icon: Home, label: "Shelters Built", value: "12", color: "earth" },
  { icon: Truck, label: "Rescue Missions", value: "500", color: "primary-soft" },
];

const helpTips = [
  "Report injured or stray dogs in your area.",
  "Foster a dog recovering from injury or trauma.",
  "Adopt a rescued dog and give them a loving home.",
  "Share our stories on social media to spread awareness.",
  "Volunteer your time at local shelters or rescue events.",
  "Donate supplies like food, blankets, or toys.",
  "Attend or help organize adoption events.",
  "Educate your community about responsible pet ownership.",
];

const WaysToHelpSection = () => {
  const [showMore, setShowMore] = useState(false);

  const initialTips = helpTips.slice(0, 4);
  const remainingTips = helpTips.slice(4);

  return (
    <section id="ways-to-help" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Impact So Far</h2>
          
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {impactStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="p-6 text-center bg-white shadow-gentle hover:shadow-warm transition-all"
              >
                <div
                  className={`w-12 h-12 bg-gradient-${
                    stat.color === "primary"
                      ? "warm"
                      : stat.color === "sage"
                      ? "sage"
                      : "warm"
                  } rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Ways to Help Tips */}
        <div className="mb-8">
          <h3 className="text-4xl font-bold text-center mb-6">Ways to Help</h3>
          <div className="pb-8">
  <p className="text-xl text-muted-foreground max-w-l mx-auto">
    Every paw deserves a chance. You don’t need to donate money to make a difference — here are simple ways you can help our furry friends today!
  </p>
</div>



          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
            
            {initialTips.map((tip, index) => (
              <Card
                key={index}
                className="p-4 flex items-center space-x-3 shadow-sm hover:shadow-md transition"
              >
                <Heart className="w-6 h-6 text-primary" />
                <p className="text-sm text-foreground">{tip}</p>
              </Card>
            ))}

            {showMore &&
              remainingTips.map((tip, index) => (
                <Card
                  key={index + 4}
                  className="p-4 flex items-center space-x-3 shadow-sm hover:shadow-md transition"
                >
                  <Heart className="w-6 h-6 text-primary" />
                  <p className="text-sm text-foreground">{tip}</p>
                </Card>
              ))}
          </div>

          {/* View More / View Less Button */}
          {remainingTips.length > 0 && (
            <div className="text-center mb-4">
              <Button onClick={() => setShowMore(!showMore)}>
                {showMore ? "View Less" : "View More"}
              </Button>
            </div>
          )}

          {/* Contact Note */}
          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            For more help, you can reach out to the <strong>PawRescue Team</strong> at{" "}
            <a href="mailto:pawrescuehelpline@gmail.com" className="underline">
              pawrescuehelpline@gmail.com
            </a>{" "}
            or take help from the chat bubble in the bottom-right corner of your screen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WaysToHelpSection;
