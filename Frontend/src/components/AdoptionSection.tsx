import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Filter } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Dog {
  _id: string;
  createdAt: string;
  reporterName?: string;
  dogName: string;
  place: string;
  info: string;
  image: string; // mandatory now
}

const API_URL = import.meta.env.VITE_API_URL;

const AdoptionSection = () => {
  const { user, token } = useAuth();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [search, setSearch] = useState("");
  const [showMore, setShowMore] = useState(false);

  const [adopterName, setAdopterName] = useState("");
  const [adopterEmail, setAdopterEmail] = useState("");
  const [adoptionReason, setAdoptionReason] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/rescues`);
        const data = await res.json();
        const dogsArray: Dog[] = data.rescues.filter((dog: Dog) => dog.image); // only include dogs with images
        const sortedDogs = dogsArray.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setDogs(sortedDogs);
        setFilteredDogs(sortedDogs);
      } catch (err) {
        console.error("Failed to fetch dogs:", err);
      }
    };
    fetchDogs();
  }, []);

  const filterDogs = (value: string) => {
    const lower = value.toLowerCase();
    const filtered = dogs.filter(
      (dog) =>
        dog.dogName.toLowerCase().includes(lower) ||
        dog.place.toLowerCase().includes(lower)
    );
    setFilteredDogs(filtered);
    setShowMore(false);
  };

  const submitAdoption = async () => {
    if (!user || !token) {
      setAdoptionStatus("Login/Sign Up is required");
      return;
    }

    if (!adopterName || !adopterEmail || !adoptionReason) {
      setAdoptionStatus("Please fill all fields.");
      return;
    }

    if (!selectedDog) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/rescues/${selectedDog._id}/adopt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: adopterName,
          email: adopterEmail,
          reason: adoptionReason,
        }),
      });
      const data = await res.json();
      setAdoptionStatus(data.success ? "✅ Request sent!" : "❌ Failed. Try again.");
      if (data.success) {
        setAdopterName("");
        setAdopterEmail("");
        setAdoptionReason("");
      }
    } catch (err) {
      console.error(err);
      setAdoptionStatus("❌ Error. Try again.");
    }
    setIsSubmitting(false);
  };

  const renderDogCard = (dog: Dog) => (
    <div
      key={dog._id}
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border hover:border-[#FF9933] hover:bg-[#FFF3E0]"
      onClick={() => setSelectedDog(dog)}
    >
      <img
        src={`${API_URL}/uploads/${dog.image}`}
        alt={dog.dogName}
        className="w-full h-48 object-cover rounded-md mb-2 transition-transform duration-300 hover:scale-105"
      />
      <h3 className="font-bold text-lg mb-1 transition-colors hover:text-[#FF9933]">
        {dog.dogName}
      </h3>
      <p className="text-gray-500 mb-1">{dog.place}</p>
      <p className="text-gray-700">{dog.info}</p>
    </div>
  );

  const latestDogs = filteredDogs.slice(0, 3);
  const restDogs = filteredDogs.slice(3);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          🐾 Dogs Available for Adoption
        </h2>

        <div className="mb-8 flex gap-2">
          <Input
            placeholder="Search by name or place"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              filterDogs(e.target.value);
            }}
          />
          <Button onClick={() => filterDogs(search)}>
            <Filter className="w-4 h-4 mr-2" /> Apply
          </Button>
        </div>

        <h3 className="text-2xl font-semibold text-[#FF9933] mb-4">Latest Rescues</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {latestDogs.map(renderDogCard)}
        </div>

        {restDogs.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">More Rescues</h3>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-300 ${
                showMore ? "max-h-full" : "max-h-0 overflow-hidden"
              }`}
            >
              {restDogs.map(renderDogCard)}
            </div>
            <div className="text-center mt-6">
              <Button onClick={() => setShowMore(!showMore)}>
                {showMore ? "View Less" : "View More"}
              </Button>
            </div>
          </>
        )}

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
                src={`${API_URL}/uploads/${selectedDog.image}`}
                alt={selectedDog.dogName}
                className="w-full h-64 md:h-48 object-contain rounded-md mb-4"
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
                  <p className="mt-2 text-sm text-red-600">{adoptionStatus}</p>
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
