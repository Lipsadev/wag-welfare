import { Heart, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-earth text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-warm rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold">PawRescue</span>
            </div>
            <p className="text-white/80 text-sm">
              Connecting hearts to save lives. Every dog deserves love, care, and a forever home.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Support Our Cause</h4>
            <div className="space-y-2">
              <a href="#rescue" className="block text-white/80 hover:text-white transition-colors text-sm">
                Report Rescue
              </a>
              <a href="#adopt" className="block text-white/80 hover:text-white transition-colors text-sm">
                Adopt a Dog
              </a>
              <a href="#volunteer" className="block text-white/80 hover:text-white transition-colors text-sm">
                Volunteer
              </a>
              <a href="#donate" className="block text-white/80 hover:text-white transition-colors text-sm">
                Donate
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Caring Paws</h4>
            <div className="space-y-2">
              <a href="https://www.vosd.in/how-to-help-stray-dogs-in-india/" className="block text-white/80 hover:text-white transition-colors text-sm">
                Care Tips
              </a>
              <a href="https://www.dogseechew.in/blog/top-animal-rescue-welfare-ngos-in-india-contact-details-other-information" className="block text-white/80 hover:text-white transition-colors text-sm">
                Trusted Shelters
              </a>
              <a href="https://www.lastdaydogrescue.org/info/display?PageID=14482" className="block text-white/80 hover:text-white transition-colors text-sm">
                Tails of Joy
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-white/80">pawrescuehelpline@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-white/80">Kolkata, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
<div className="bg-primary/20 rounded-lg p-6 mb-8 text-center">
  <h3 className="font-semibold text-lg mb-2">24/7 Emergency Rescue Support</h3>
  <p className="text-white/90 mb-4 text-sm">
    Found a dog in immediate danger? Mail us for instant help.
  </p>
  <a
    href="mailto:pawrescuehelpline@gmail.com"
    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
  >
    <Mail className="w-4 h-4 mr-2" />
    Mail Us
  </a>
</div>


        {/* Bottom */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
          <p>&copy; 2024 PawRescue. All rights reserved. Made with ❤️ for our furry friends.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
