// 📌 components/PetList.tsx

import { useEffect, useState } from "react";
import { getPets } from "../lib/api";

// ✅ Define Pet type for safety
type Pet = {
  _id: string;
  name: string;
  age: number | string;
  type: "dog" | "cat" | "rabbit" | "guinea pig" | "hamster" | "fish";
  location?: string;
  image?: string;
  description?: string;
};

export default function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPets() {
      try {
        const data = await getPets();
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPets();
  }, []);

  const filteredPets =
    filter === "all"
      ? pets
      : pets.filter((pet) => pet.type.toLowerCase() === filter.toLowerCase());

  if (loading) {
    return <p className="text-center py-6">Loading pets...</p>;
  }

  return (
    <div className="p-4">
      {/* 🔹 Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "dog", "cat", "rabbit", "guinea pig", "hamster", "fish"].map(
          (animal) => (
            <button
              key={animal}
              onClick={() => setFilter(animal)}
              className={`px-4 py-2 rounded-full border transition ${
                filter === animal
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {animal.charAt(0).toUpperCase() + animal.slice(1)}
            </button>
          )
        )}
      </div>

      {/* 🔹 Removed Pet Grid */}
      <p className="text-center text-gray-500">
        Pet cards are now displayed in the AdoptionSection.
      </p>
    </div>
  );
}
