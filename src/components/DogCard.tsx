import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Calendar, Weight } from "lucide-react";

interface DogCardProps {
  name: string;
  age: string;
  breed: string;
  location: string;
  image: string;
  description: string;
  vaccinated: boolean;
  size: string;
  urgent?: boolean;
}

const DogCard = ({ name, age, breed, location, image, description, vaccinated, size, urgent }: DogCardProps) => {
  return (
    <Card className="overflow-hidden shadow-gentle hover:shadow-warm transition-all duration-300 group">
      <div className="relative">
        <img 
          src={image} 
          alt={`${name} - ${breed}`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {urgent && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
            Urgent
          </Badge>
        )}
        {vaccinated && (
          <Badge className="absolute top-3 right-3 bg-sage text-white">
            Vaccinated
          </Badge>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
          <Heart className="w-4 h-4 text-white" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-foreground">{name}</h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{age}</span>
          </div>
          <div className="flex items-center">
            <Weight className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{size}</span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground mb-4">
          <span className="font-medium">Breed:</span> {breed}
        </div>
        
        <div className="flex gap-2">
          <Button variant="hero" className="flex-1">
            <Heart className="w-4 h-4 mr-2" />
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

export default DogCard;