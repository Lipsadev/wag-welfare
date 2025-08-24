import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Camera, AlertTriangle } from "lucide-react";

const RescueSection = () => {
  return (
    <section id="rescue" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Report a Dog in Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Spotted a stray or injured dog? Your quick action can save a life. Report the location and our network of volunteers will respond immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* How It Works */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8">How Rescue Reporting Works</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">1. Take a Photo</h4>
                  <p className="text-muted-foreground">Capture a clear image of the dog and its current condition to help rescuers assess the situation.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-sage rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">2. Share Location</h4>
                  <p className="text-muted-foreground">Provide the exact location so our volunteers can reach the dog quickly and efficiently.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-soft rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">3. Immediate Response</h4>
                  <p className="text-muted-foreground">Nearby NGOs and volunteers get instant notifications and can coordinate the rescue mission.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Report Card */}
          <Card className="p-8 shadow-warm bg-gradient-to-br from-white to-cream">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">Emergency Rescue</h3>
              <p className="text-muted-foreground">Every minute counts when a dog needs help</p>
            </div>

            <div className="space-y-4">
              <Button variant="hero" size="lg" className="w-full text-lg py-6">
                <Camera className="w-5 h-5 mr-2" />
                Report Rescue Now
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">or</span>
                </div>
              </div>
              
              <Button variant="outline" size="lg" className="w-full">
                <Phone className="w-5 h-5 mr-2" />
                Call Emergency Hotline
              </Button>
            </div>

            <div className="mt-6 p-4 bg-sage/10 rounded-lg">
              <p className="text-sm text-center text-sage-dark">
                <strong>24/7 Helpline:</strong> +91-9876543210
              </p>
            </div>
          </Card>
        </div>

        {/* Recent Rescues */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">Recent Successful Rescues</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 bg-sage/5 border-sage/20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center text-white font-semibold">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Rescue #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">Completed 2 hours ago</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RescueSection;