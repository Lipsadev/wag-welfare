import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PawPrint } from "lucide-react";

interface PetCardProps {
  name: string;
  type: string;        // only "dog"
  description: string;
  image: string;
}

const PetCard = ({ name, type, description, image }: PetCardProps) => {
  return (
    <Card className="overflow-hidden shadow-gentle hover:shadow-warm transition-all duration-300 group">
      {/* 🖼️ Image */}
      <div className="relative">
        <img
          src={image}
          alt={`${name} - ${type}`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 📄 Content */}
      <div className="p-6">
        {/* Name */}
        <h3 className="text-xl font-semibold text-foreground mb-2">{name}</h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button variant="hero" className="flex-1">
            <PawPrint className="w-4 h-4 mr-2" />
            Adopt Me
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PetCard;
