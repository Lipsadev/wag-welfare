import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface Rescue {
  _id: string;
  name: string;
  dogName: string;
  place: string;
  info: string;
  image: string;
  createdAt: string;
  adoptionCount?: number;
}

interface RescueListProps {}

const RescueList = forwardRef((props: RescueListProps, ref) => {
  const [rescues, setRescues] = useState<Rescue[]>([]);
  const [selectedRescue, setSelectedRescue] = useState<Rescue | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const API_BASE_URL = "https://wag-welfare-a0at.onrender.com";

  const fetchRescues = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/rescues`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log("Fetched rescues:", data);
      setRescues(Array.isArray(data) ? data : data.rescues || []);
    } catch (err) {
      console.error("Error fetching rescues:", err);
    }
  };

  useEffect(() => {
    fetchRescues();
  }, []);

  useImperativeHandle(ref, () => ({
    refreshRescues: fetchRescues,
  }));

  const openModal = (rescue: Rescue) => {
    setSelectedRescue(rescue);
    setDialogOpen(true);
  };

  const totalRescued = rescues.length;
  const totalAdoptions = rescues.reduce((acc, r) => acc + (r.adoptionCount || 0), 0);
  const totalVolunteers = 50; // Placeholder

  return (
    <section className="container mx-auto py-16 px-4">
      <p className="text-center text-lg text-black-600 mb-6">
        Every paw we save brings a tail wag and a new beginning.🐾
      </p>

      <h2 className="text-3xl font-bold mb-8 text-center">Recent Rescues</h2>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-3xl font-bold text-primary">120+</h3>
          <p className="text-gray-600">Dogs Rescued</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-3xl font-bold text-primary">77+</h3>
          <p className="text-gray-600">Happy Adoptions</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-3xl font-bold text-primary">50+</h3>
          <p className="text-gray-600">Active Volunteers</p>
        </div>
      </div>

      {/* Rescue Details Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg w-full rounded-lg p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-xl font-bold">{selectedRescue?.dogName}</DialogTitle>
            <DialogClose asChild>
              <button className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </DialogClose>
          </div>
          {selectedRescue && (
            <div>
              <img
                src={
                  selectedRescue.image.startsWith("http")
                    ? selectedRescue.image
                    : `${API_BASE_URL}/uploads/${selectedRescue.image}`
                }
                alt={selectedRescue.dogName}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Place:</span> {selectedRescue.place}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Info:</span> {selectedRescue.info}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Adoptions:</span>{" "}
                {selectedRescue.adoptionCount || 0}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
});

export default RescueList;
