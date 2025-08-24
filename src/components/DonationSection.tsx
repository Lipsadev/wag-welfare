import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Truck, Home, IndianRupee, Users, TrendingUp } from "lucide-react";

const DonationSection = () => {
  const impactStats = [
    { icon: Heart, label: "Dogs Fed", value: "1,250", color: "primary" },
    { icon: Shield, label: "Vaccinations", value: "800", color: "sage" },
    { icon: Home, label: "Shelters Built", value: "12", color: "earth" },
    { icon: Truck, label: "Rescue Missions", value: "500", color: "primary-soft" }
  ];

  const donationOptions = [
    {
      amount: 500,
      title: "Feed a Dog",
      description: "Provides nutritious meals for a rescued dog for a week",
      impact: "1 week of food"
    },
    {
      amount: 1500,
      title: "Medical Care",
      description: "Covers vaccination and basic medical treatment",
      impact: "Complete health checkup"
    },
    {
      amount: 5000,
      title: "Rescue Mission",
      description: "Funds an emergency rescue operation including transport",
      impact: "Save a life"
    }
  ];

  return (
    <section id="donate" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Donation Saves Lives
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every rupee counts in our mission to rescue, heal, and rehome stray dogs. See the direct impact of your generosity.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-6 text-center bg-white shadow-gentle hover:shadow-warm transition-all">
                <div className={`w-12 h-12 bg-gradient-${stat.color === 'primary' ? 'warm' : stat.color === 'sage' ? 'sage' : 'warm'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Donation Options */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8">Choose Your Impact</h3>
            <div className="space-y-4">
              {donationOptions.map((option, index) => (
                <Card key={index} className="p-6 hover:shadow-gentle transition-all border-l-4 border-l-primary group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <IndianRupee className="w-5 h-5 text-primary" />
                        <span className="text-xl font-bold text-foreground">{option.amount.toLocaleString()}</span>
                        <Badge className="bg-sage/20 text-sage-dark">{option.impact}</Badge>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{option.title}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <Button variant="hero" className="ml-4 group-hover:scale-105 transition-transform">
                      Donate
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom Donation */}
          <Card className="p-8 shadow-warm bg-gradient-to-br from-white to-primary/5">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white fill-current" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">Custom Donation</h3>
              <p className="text-muted-foreground">Choose your own amount to make a difference</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 p-4 border border-border rounded-lg bg-white">
                <IndianRupee className="w-5 h-5 text-muted-foreground" />
                <input 
                  type="number" 
                  placeholder="Enter amount" 
                  className="flex-1 bg-transparent border-none outline-none text-lg font-medium"
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full text-lg py-6">
                <Heart className="w-5 h-5 mr-2 fill-current" />
                Donate Now
              </Button>
              
              <div className="grid grid-cols-3 gap-2">
                {[1000, 2500, 10000].map((amount) => (
                  <Button key={amount} variant="outline" size="sm" className="text-xs">
                    ₹{amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-sage/10 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-sm text-sage-dark">
                <Shield className="w-4 h-4" />
                <span><strong>100% Secure</strong> - All donations are safe and transparent</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Transparency Section */}
        <Card className="p-8 bg-white shadow-gentle">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-2">Complete Transparency</h3>
            <p className="text-muted-foreground">Track how your donations are making a real impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Live Updates</h4>
              <p className="text-sm text-muted-foreground">Get real-time updates on how your donation is being used</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Impact Stories</h4>
              <p className="text-sm text-muted-foreground">Read stories of dogs your donation helped rescue and heal</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-earth rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Financial Reports</h4>
              <p className="text-sm text-muted-foreground">Access detailed reports on fund allocation and usage</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DonationSection;