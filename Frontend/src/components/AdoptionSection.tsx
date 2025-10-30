import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Dog {
  dogName: string;
  place: string;
  info: string;
  image: string;
}

const AdoptionSection = () => {
  const { user, token } = useAuth();
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [adopterName, setAdopterName] = useState("");
  const [adopterEmail, setAdopterEmail] = useState("");
  const [adopterPhone, setAdopterPhone] = useState("");
  const [adoptionReason, setAdoptionReason] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // 🐶 Static Dog Data
  const dogs: Dog[] = [
    {
      dogName: "Snowfy",
      place: "Delhi",
      info: "Say hello to Snowfy, a sweet and gentle soul from Delhi who’s ready to find a loving forever home! She’s calm, affectionate, and has the kind of warmth that melts hearts instantly. If you’re in Delhi and looking for a loyal companion who’ll fill your life with love and peace, Snowfy is waiting just for you!",
      image: "https://res.cloudinary.com/dlgow7bhp/image/upload/v1761805737/IMG-20250925-WA0018_ccqtqy.jpg",
    },
    {
      dogName: "Tuffy",
      place: "Delhi",
      info: "Say hello to Tuffy, a sweet and spirited dog who’s eager to share his love and companionship. With his friendly nature and gentle heart, Tuffy is ready to make your home brighter and happier every day.",
      image: "https://res.cloudinary.com/dlgow7bhp/image/upload/v1761805735/IMG-20250925-WA0016_s0jbkv.jpg",
    },
    {
      dogName: "Moti",
      place: "Kolkata",
      info: "Moti is a gentle and loyal companion ready to find a family who will love him as much as he loves them. With his friendly nature and affectionate heart, he’s sure to become the perfect addition to your home.",
      image: "https://res.cloudinary.com/dlgow7bhp/image/upload/v1761805738/IMG-20250925-WA0023_oqard0.jpg",
    },
    {
      dogName: "Rocky",
      place: "Kolkata",
      info: "Say hello to Rocky, Kolkata’s very own bundle of joy! Energetic, affectionate, and full of mischief, Rocky is ready to fill your days with laughter, cuddles, and unconditional love.",
      image: "https://res.cloudinary.com/dlgow7bhp/image/upload/v1761805735/WhatsApp_Image_2025-09-11_at_15.47.18_9027aa6e_hjpypq.jpg",
    },
    {
      dogName: "Bruno",
      place: "Mumbai",
      info: "Meet Bruno, a playful and protective boy from Mumbai who loves everyone he meets! 🐾 With his lively energy and loyal heart, he’s ready to become your best friend and bring endless joy to your life. If you’re in Mumbai and can give Bruno a loving home, please reach out today!",
      image: "https://res.cloudinary.com/dlgow7bhp/image/upload/v1761805735/IMG-20250925-WA0015_wuhw5v.jpg",
    },
    {
      dogName: "Lily",
      place: "Delhi",
      info: "Say hello to Lily, a gentle and affectionate girl from Delhi who adores cuddles and peaceful walks. 🌸 She has the sweetest temperament and is waiting to share her warmth with a caring family. If you’re in Delhi and can open your heart to Lily, please get in touch soon!",
      image: "https://res.cloudinary.com/dlgow7bhp/image/upload/v1761805735/IMG-20250925-WA0014_mtdi1f.jpg",
    },
    {
      dogName: "Simba",
      place: "Kolkata",
      info: "Simba from Kolkata is a brave and loving boy with a golden heart. 🦁 Playful, cheerful, and loyal, he’s ready to make every day brighter for his new family. If you’re in Kolkata and looking for a true companion, Simba would love to meet you!",
      image: "https://res.cloudinary.com/dlgow7bhp/image/upload/v1761805734/My_own_personal_rescue__She_s_available_for_bw1mbz.jpg",
    },
    {
      dogName: "Bella",
      place: "Mumbai",
      info: "Meet Bella, a kind and loving sweetheart from Mumbai who dreams of finding her forever home. 💕 She’s gentle, affectionate, and loves to be around people. If you’re in Mumbai and can offer Bella a family, please reach out — she’s waiting for you!",
      image: "https://res.cloudinary.com/dlgow7bhp/image/upload/v1761805734/IMG-20250925-WA0013_kldcmc.jpg",
    },
    {
      dogName: "Tiger",
      place: "Delhi",
      info: "Say hi to Tiger, a confident and fun-loving boy from Delhi who’s full of life and energy! 🐶 He loves to play, cuddle, and protect the ones he loves. If you’re in Delhi and can give Tiger a safe, loving home, please contact us right away!",
      image: "https://res.cloudinary.com/dlgow7bhp/image/upload/v1761803654/obsskgq0mstnqjeayrig.jpg",
    },
    {
      dogName: "Oreo",
      place: "Kolkata",
      info: "Meet Oreo, a sweet and playful pup from Kolkata who’s just as adorable as his name! 🍪 He loves attention, playtime, and warm hugs. If you’re in Kolkata and can give Oreo the loving home he deserves, please get in touch!",
      image: "https://res.cloudinary.com/dlgow7bhp/image/upload/v1761805734/WhatsApp_Image_2025-09-11_at_15.47.18_09e36696_zikrgx.jpg",
    },
    {
      dogName: "Coco",
      place: "Chennai",
      info: "Coco from Chennai is a cheerful and loyal girl who adores people and other pets alike. 🐾 With her bright eyes and loving heart, she’s ready to bring happiness wherever she goes. If you’re in Chennai and can adopt Coco, please reach out soon!",
      image: "https://res.cloudinary.com/dlgow7bhp/image/upload/v1761806259/dogs_puppy_wce55d.jpg",
    },
  ];

  // 🧡 Adoption Form Submit (Mock Only)
  const submitAdoption = async () => {
    if (!user || !token) {
      setAdoptionStatus("Login/Sign Up is required");
      return;
    }
    if (!adopterName || !adopterEmail || !adopterPhone || !adoptionReason) {
      setAdoptionStatus("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAdoptionStatus("✅ Adoption request submitted successfully!");
      setAdopterName("");
      setAdopterEmail("");
      setAdopterPhone("");
      setAdoptionReason("");
    }, 1000);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          🐾 Dogs Available for Adoption
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {dogs.slice(0, showMore ? dogs.length : 6).map((dog, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 
                         hover:shadow-xl hover:-translate-y-1 hover:border hover:border-[#FF9933] hover:bg-[#FFF3E0]"
              onClick={() => setSelectedDog(dog)}
            >
              <img
                src={dog.image}
                alt={dog.dogName}
                className="w-full h-48 object-cover rounded-md mb-2 transition-transform duration-300 hover:scale-105"
              />
              <h3 className="font-bold text-lg mb-1 hover:text-[#FF9933] transition-colors">
                {dog.dogName}
              </h3>
              <p className="text-gray-500 mb-1">{dog.place}</p>
              <p className="text-gray-700 text-sm">{dog.info.slice(0, 120)}...</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={() => setShowMore(!showMore)}>
            {showMore ? "View Less" : "View More"}
          </Button>
        </div>

        {/* 🐾 Adoption Modal */}
        {selectedDog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-auto">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl relative shadow-lg">
              <button
                onClick={() => setSelectedDog(null)}
                className="absolute top-3 right-3 p-1 rounded-full bg-white hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedDog.image}
                alt={selectedDog.dogName}
                className="w-full h-64 object-contain rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{selectedDog.dogName}</h3>
              <p><strong>Place:</strong> {selectedDog.place}</p>
              <p><strong>Info:</strong> {selectedDog.info}</p>

              <div className="mt-4 border-t pt-4">
                <h4 className="font-semibold mb-2">Request Adoption</h4>
                <Input
                  placeholder="Your Name"
                  value={adopterName}
                  onChange={(e) => setAdopterName(e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="Your Email"
                  type="email"
                  value={adopterEmail}
                  onChange={(e) => setAdopterEmail(e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="Your Phone Number"
                  type="tel"
                  value={adopterPhone}
                  onChange={(e) => setAdopterPhone(e.target.value)}
                  className="mb-2"
                />
                <Textarea
                  placeholder="Reason for Adoption"
                  value={adoptionReason}
                  onChange={(e) => setAdoptionReason(e.target.value)}
                  className="mb-2"
                />
                <Button
                  onClick={submitAdoption}
                  disabled={isSubmitting}
                  className="w-full mt-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
                {adoptionStatus && (
                  <p className="mt-2 text-sm text-green-600">{adoptionStatus}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdoptionSection;
