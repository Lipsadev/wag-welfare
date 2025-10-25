import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Calendar, Weight, PawPrint } from "lucide-react";

interface PetCardProps {
  name: string;
  age: string;
  type: string;       // 🐶 cat, rabbit, fish etc.
  breed?: string;     // optional because not all pets have "breed"
  location: string;
  image: string;
  description: string;
  vaccinated?: boolean;
  size?: string;
  urgent?: boolean;
}

const PetCard = ({
  name,
  age,
  type,
  breed,
  location,
  image,
  description,
  vaccinated,
  size,
  urgent,
}: PetCardProps) => {
  return (
    <Card className="overflow-hidden shadow-gentle hover:shadow-warm transition-all duration-300 group">
      {/* 🖼️ Image */}
      <div className="relative">
        <img
          src={image}
          alt={`${name} - ${type}`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* 🔖 Badges */}
        {urgent && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
            Urgent
          </Badge>
        )}
        {vaccinated && (
          <Badge className="absolute top-3 right-3 bg-green-600 text-white">
            Vaccinated
          </Badge>
        )}

        {/* ❤️ Favourite */}
        <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
          <Heart className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* 📄 Content */}
      <div className="p-6">
        {/* Name + Location */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-foreground">{name}</h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Age / Size */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{age}</span>
          </div>
          {size && (
            <div className="flex items-center">
              <Weight className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{size}</span>
            </div>
          )}
        </div>

        {/* Breed / Type */}
        <div className="text-sm text-muted-foreground mb-4">
          <span className="font-medium">Type:</span> {type}
          {breed && (
            <>
              {" • "}
              <span className="font-medium">Breed:</span> {breed}
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button variant="hero" className="flex-1">
            <PawPrint className="w-4 h-4 mr-2" />
            Adopt Me
          </Button>
          <Button variant="outline" size="sm">
            Learn More
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PetCard;
