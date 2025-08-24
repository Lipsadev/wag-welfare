import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DogCard from "./DogCard";
import { Search, Filter } from "lucide-react";
import dogProfile1 from "@/assets/dog-profile-1.jpg";
import dogProfile2 from "@/assets/dog-profile-2.jpg";
import dogProfile3 from "@/assets/dog-profile-3.jpg";

const AdoptionSection = () => {
  const featuredDogs = [
    {
      name: "Buddy",
      age: "2-3 years",
      breed: "Golden Retriever Mix",
      location: "Mumbai, MH",
      image: dogProfile1,
      description: "Buddy is a gentle, loving dog who gets along well with children and other pets. He loves playing fetch and long walks.",
      vaccinated: true,
      size: "Large",
      urgent: false
    },
    {
      name: "Luna",
      age: "1-2 years",
      breed: "Mixed Breed",
      location: "Delhi, DL",
      image: dogProfile2,
      description: "Luna is an energetic young dog who loves attention and treats. She's very smart and learns commands quickly.",
      vaccinated: true,
      size: "Medium",
      urgent: true
    },
    {
      name: "Max",
      age: "6 months",
      breed: "Indian Pariah",
      location: "Bangalore, KA",
      image: dogProfile3,
      description: "Max is a playful puppy who loves to explore and make new friends. He's looking for a patient family to help him grow.",
      vaccinated: false,
      size: "Small",
      urgent: false
    }
  ];

  return (
    <section id="adopt" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Perfect Companion
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every dog deserves a loving home. Browse our rescued dogs ready for adoption and give them the second chance they deserve.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-gentle mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search by name or breed..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="puppy">Puppy (0-1 year)</SelectItem>
                <SelectItem value="young">Young (1-3 years)</SelectItem>
                <SelectItem value="adult">Adult (3-7 years)</SelectItem>
                <SelectItem value="senior">Senior (7+ years)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="hero" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Featured Dogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredDogs.map((dog, index) => (
            <DogCard key={index} {...dog} />
          ))}
        </div>

        {/* View More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View All Available Dogs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdoptionSection;