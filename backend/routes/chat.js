import express from "express";
import NGO from "../models/ngoModel.js";

const router = express.Router();

// 🧠 Knowledge base responses
const knowledgeBase = [
  {
    keywords: ["report", "rescue"],
    response: `🐾 Report a Rescue
Help us save dogs in need by reporting a rescue. Here's how it works:
1. Your Name – Let us know who's reporting.
2. Dog's Name – If known, share the dog's name.
3. Place / Location – Provide the exact location of the dog.
4. Dog Image – Upload a photo to help us identify and assist the dog.
5. Additional Information – Share any details about the dog's condition or situation.
6. Submit Rescue – Click submit, and our team will be notified immediately! 🚨`,
  },
  {
    keywords: ["adopt", "adoption"],
    response: `🏡 Adoption Process
Bring a furry friend home! Our adoption process is simple and transparent:
1. Browse Dogs – Explore the available dogs in the Adoption section.
2. Select a Pet – Click on the dog you’d like to adopt.
3. Fill Out the "Request Adoption" Form – Provide:
   - Your Name
   - Your Email
   - Reason for Adoption
   - Submit Request
4. Wait for Response – The PawRescue team will contact you via email.
5. Connect with Volunteers – You’ll speak with a volunteer and receive more details about your chosen pet.
6. Finalize Adoption – Complete the adoption process and welcome your new furry family member! 🏠❤️`,
  },
  {
    keywords: ["volunteer"],
    response: `🙋 Join as a Volunteer
Become a hero for dogs in need! Here's how:
1. Your Name – So we know who you are.
2. Place / Location – Let us know where you are based.
3. Phone Number – So we can contact you quickly.
4. Availability – Share the days and times you can help.
5. Submit Volunteer Request – Our team will review your request and get in touch with you. 🌟`,
  },
];

// ✅ Fallback NGO data (structured)
const fallbackNGOs = {
  delhi: [
    { name: "Friendicoes SECA", website: "https://friendicoes.org", focus: "Shelter, adoption, emergency rescue, veterinary hospital" },
    { name: "Sanjay Gandhi Animal Care Centre", website: "", focus: "India’s oldest and largest shelter, 3000+ animals, adoption and medical care" },
    { name: "People for Animals (PFA)", website: "https://www.peopleforanimalsindia.org", focus: "Largest animal welfare NGO in India, hospitals, ambulances, shelters, helplines" },
  ],
  mumbai: [
    { name: "Save Our Strays", website: "", focus: "Stray dog welfare, community feeding programs, educational campaigns" },
    { name: "World For All", website: "https://worldforall.in", focus: "Adoption, fostering, youth engagement, awareness programs" },
    { name: "The Bombay Society for the Prevention of Cruelty to Animals (BSPCA)", website: "https://bspca.org", focus: "Shelter, ambulance, and hospital services" },
  ],
  udaipur: [
    { name: "Animal Aid Unlimited", website: "https://animalaidunlimited.org", focus: "Rescue and care of street animals—dogs, cows, donkeys" },
  ],
  pune: [
    { name: "RESQ Charitable Trust", website: "https://resqct.org", focus: "Rescue and treat injured urban and wild animals" },
  ],
  chennai: [
    { name: "Blue Cross of India (Chennai)", website: "https://bluecrossofindia.org", focus: "Rescue, treatment, adoption, sterilization programs" },
  ],
  india: [
    { name: "Wildlife Trust of India", website: "https://www.wti.org.in", focus: "Wildlife protection, habitat restoration, policy advocacy, rescue operations" },
  ],
};

// ✅ Test route
router.get("/", (req, res) => {
  res.json({ message: "Chat API is running ✅" });
});

// 📌 Chat endpoint
router.post("/", async (req, res) => {
  const { message, city } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Please provide a message." });
  }

  const lowerMsg = message.toLowerCase();

  // 🧠 Knowledge base match
  const match = knowledgeBase.find((entry) =>
    entry.keywords.some((k) => lowerMsg.includes(k))
  );
  if (match) return res.json({ reply: match.response });

  // 📍 Detect city name
  let detectedCity = city?.toLowerCase();
  if (!detectedCity) {
    const cityMatch = lowerMsg.match(/ngos?\s+(in\s+)?([a-z\s]+)/i);
    detectedCity = cityMatch ? cityMatch[2].trim().toLowerCase() : null;
  }

  // 🐾 Handle “nearest NGO” or “to me” cases gracefully
  const nearMePhrases = ["near me", "to me", "around me", "closest ngo", "nearest ngo"];
  if (nearMePhrases.some((phrase) => lowerMsg.includes(phrase))) {
    return res.json({
      reply: "Please tell me your city or area so I can find nearby NGOs 🐾",
    });
  }

  // ✅ If city found, search DB or fallback list
  if (detectedCity) {
    try {
      const ngos = await NGO.find({ city: new RegExp(`^${detectedCity}$`, "i") }).limit(4);

      if (ngos.length > 0) {
        return res.json({
          reply: `🐾 Here are some NGOs in ${detectedCity.charAt(0).toUpperCase() + detectedCity.slice(1)}:`,
          ngos,
        });
      }

      if (fallbackNGOs[detectedCity]) {
        return res.json({
          reply: `🐾 Here are some NGOs in ${detectedCity.charAt(0).toUpperCase() + detectedCity.slice(1)}:`,
          ngos: fallbackNGOs[detectedCity],
        });
      }

      return res.json({ reply: `Sorry, I don't have NGO data for "${detectedCity}" yet. 🐾` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ reply: "Internal server error while fetching NGOs." });
    }
  }

  // 💬 Default fallback
  return res.json({
    reply:
      "🐾 I'm here to help with dog rescue, adoption, and volunteering! You can also ask for NGOs in a city (e.g., 'NGOs in Delhi') or tell me your city so I can find nearby ones.",
  });
});

export default router;
