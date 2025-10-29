import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

interface RescueListProps {}

const RescueList = forwardRef((props: RescueListProps, ref) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate quick loading
    setTimeout(() => setLoading(false), 600);
  }, []);

  useImperativeHandle(ref, () => ({}));

  if (loading) {
    return <p className="text-center py-6 text-gray-500">Loading rescues...</p>;
  }

  return (
    <section className="container mx-auto py-16 px-4">
      <p className="text-center text-lg text-gray-700 mb-6">
        Every paw we save brings a tail wag and a new beginning. 🐾
      </p>

      <h2 className="text-3xl font-bold mb-8 text-center">Rescue Overview</h2>

      {/* ✅ Fixed Stats Only */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-3xl font-bold text-primary">70+</h3>
          <p className="text-gray-600">Total Rescues</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-3xl font-bold text-primary">55+</h3>
          <p className="text-gray-600">Happy Adoptions</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-3xl font-bold text-primary">30+</h3>
          <p className="text-gray-600">Active Volunteers</p>
        </div>
      </div>

      <p className="text-center text-gray-500">
        Our mission continues — every rescue counts. 🐶💙
      </p>
    </section>
  );
});

export default RescueList;
