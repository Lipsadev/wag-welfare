import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Star, Award, Heart, MapPin, Clock } from "lucide-react";

const VolunteerSection = () => {
  const topVolunteers = [
    {
      name: "Priya Sharma",
      location: "Mumbai, MH",
      rescues: 25,
      rating: 4.9,
      speciality: "Emergency Response"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi, DL", 
      rescues: 18,
      rating: 4.8,
      speciality: "Medical Care"
    },
    {
      name: "Anita Patel",
      location: "Bangalore, KA",
      rescues: 32,
      rating: 5.0,
      speciality: "Adoption Coordinator"
    }
  ];

  return (
    <section id="volunteer" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Join Our Volunteer Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of a caring community that makes a real difference. Every volunteer action saves lives and brings hope to stray dogs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* How to Volunteer */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8">Ways to Help</h3>
            <div className="space-y-6">
              <Card className="p-6 border-sage/20 bg-sage/5 hover:shadow-gentle transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Rescue Operations</h4>
                    <p className="text-muted-foreground text-sm">Join emergency rescue missions and save dogs in critical situations.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20 bg-primary/5 hover:shadow-gentle transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-sage rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Foster Care</h4>
                    <p className="text-muted-foreground text-sm">Provide temporary homes for rescued dogs during their recovery.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-earth/20 bg-earth/5 hover:shadow-gentle transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-earth rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Adoption Events</h4>
                    <p className="text-muted-foreground text-sm">Help organize adoption drives and connect dogs with loving families.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Join Form */}
          <Card className="p-8 shadow-warm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">Become a Volunteer</h3>
              <p className="text-muted-foreground">Join our mission to save every stray dog</p>
            </div>

            <div className="space-y-4">
              <Button variant="hero" size="lg" className="w-full text-lg py-6">
                <Heart className="w-5 h-5 mr-2" />
                Start Volunteering Today
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Local NGOs
                </Button>
                <Button variant="outline" className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  Flexible Hours
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-sage/10 rounded-lg">
              <p className="text-sm text-center text-sage-dark">
                <strong>No experience needed!</strong> We provide training and support for all volunteers.
              </p>
            </div>
          </Card>
        </div>

        {/* Top Volunteers */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">Community Heroes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topVolunteers.map((volunteer, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-gentle transition-shadow">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {volunteer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="font-semibold text-foreground mb-1">{volunteer.name}</h4>
                <p className="text-sm text-muted-foreground mb-3 flex items-center justify-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {volunteer.location}
                </p>
                
                <div className="flex justify-center items-center space-x-4 mb-3">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-1">{volunteer.rescues}</Badge>
                    <p className="text-xs text-muted-foreground">Rescues</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-3 h-3 fill-primary text-primary mr-1" />
                      <span className="text-sm font-medium">{volunteer.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>
                
                <Badge className="bg-sage/20 text-sage-dark text-xs">
                  {volunteer.speciality}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;