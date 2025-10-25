import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // close mobile menu on click
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-warm rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-bold text-foreground">PawRescue</span>
          </div>

          {/* Centered Navigation */}
          <div className="hidden md:flex items-center space-x-8 mx-auto">
            <a
              href="#adopt"
              onClick={handleScroll("adopt")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Adopt
            </a>
            <a
              href="#volunteer"
              onClick={handleScroll("volunteer")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Volunteer
            </a>
            <a
              href="#ngos"
              onClick={handleScroll("ngos")}
              className="text-foreground hover:text-primary transition-colors"
            >
              NGOs
            </a>
            <a
              href="#rescue"
              onClick={handleScroll("rescue")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Report Rescue
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a
                href="#rescue"
                onClick={handleScroll("rescue")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Report Rescue
              </a>
              <a
                href="#adopt"
                onClick={handleScroll("adopt")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Adopt
              </a>
              <a
                href="#volunteer"
                onClick={handleScroll("volunteer")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Volunteer
              </a>
              <a
                href="#ngos"
                onClick={handleScroll("ngos")}
                className="text-foreground hover:text-primary transition-colors"
              >
                NGOs
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
