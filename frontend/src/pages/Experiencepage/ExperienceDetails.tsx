import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Slot {
  _id: string;
  date: string; 
  time: string; 
  capacity: number;
}

interface Experience {
  _id: string;
  id: number;
  title: string;
  location: string;
  imageUrl: string;
  price: number;
  description: string;
  availableSlots: Slot[];
}

const ExperienceDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const tax = 59;

  // Fetch experience + slots
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`https://backkend-h76s.onrender.com/experiences/${id}`);
        if (!res.ok) throw new Error("Failed to load experience");
        const data = await res.json();
        setExperience(data);

        
        if (data.availableSlots.length > 0) {
          const firstSlot = new Date(data.availableSlots[0].date)
            .toISOString()
            .split("T")[0];
          setSelectedDate(firstSlot);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  const price = experience?.price || 0;
  const total = price * quantity + tax;


  const slotDates =
    experience?.availableSlots.map(
      (slot) => new Date(slot.date).toISOString().split("T")[0]
    ) || [];


  const latestSlotDate = slotDates.length
    ? slotDates.reduce((a, b) => (a > b ? a : b))
    : "";

 
  const isDateSoldOut =
    selectedDate && latestSlotDate && selectedDate > latestSlotDate;

 
  let filteredSlots =
    experience?.availableSlots.filter(
      (slot) => new Date(slot.date).toISOString().split("T")[0] === selectedDate
    ) || [];

  
  if (
    filteredSlots.length === 0 &&
    selectedDate &&
    !isDateSoldOut &&
    experience
  ) {
    const nextAvailableSlot = experience.availableSlots.find(
      (slot) => new Date(slot.date).toISOString().split("T")[0] > selectedDate
    );
    if (nextAvailableSlot) {
      const nextDate = new Date(nextAvailableSlot.date)
        .toISOString()
        .split("T")[0];
      filteredSlots = experience.availableSlots.filter(
        (slot) => new Date(slot.date).toISOString().split("T")[0] === nextDate
      );
    }
  }


  const handleConfirm = () => {
    if (!selectedTime || isDateSoldOut || !experience) return;

    navigate("/checkout", {
      state: {
        experienceId: experience._id,
        title: experience.title,
        imageUrl: experience.imageUrl,
        date: selectedDate,
        time: selectedTime,
        quantity,
        total,
      },
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading experience...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  if (!experience) return null;

  return (
    <section className="max-w-7xl mx-auto p-6">
    
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        ← <span className="ml-2">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
        <div className="lg:col-span-2">
          <img
            src={experience.imageUrl || "/images/default.jpg"}
            alt={experience.title}
            className="w-full h-80 object-cover rounded-xl mb-6"
          />

          <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
          <p className="text-gray-600 mb-6">{experience.description}</p>

          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Select a Date</h2>
            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime("");
              }}
              className="border rounded-lg p-2 text-gray-700 focus:border-yellow-400 focus:ring-yellow-400 outline-none"
            />
          </div>

          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Choose time</h2>

            {isDateSoldOut ? (
              <p className="text-red-500 text-sm font-medium">
                All slots are sold out for this date.
              </p>
            ) : filteredSlots.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {filteredSlots.map((slot) => (
                  <button
                    key={slot._id}
                    disabled={slot.capacity === 0}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      selectedTime === slot.time
                        ? "bg-yellow-400 border-yellow-400 text-black"
                        : slot.capacity === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 text-gray-700 hover:border-yellow-400"
                    }`}
                  >
                    {slot.time}{" "}
                    {slot.capacity > 0 ? (
                      <span className="text-red-500 ml-1">
                        {slot.capacity} left
                      </span>
                    ) : (
                      <span className="ml-1">Sold out</span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No slots available</p>
            )}
          </div>

      
          <div>
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="bg-gray-100 text-gray-600 p-3 rounded-lg text-sm">
              Scenic routes, trained guides, and safety briefing. Minimum age
              10.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border h-fit">
          <div className="flex justify-between mb-2">
            <span>Starts at</span>
            <span className="font-semibold">₹{price}</span>
          </div>

          <div className="flex justify-between mb-2 items-center">
            <span>Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border px-2 rounded hover:bg-gray-100"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border px-2 rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{price * quantity}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Taxes</span>
            <span>₹{tax}</span>
          </div>

          <hr className="my-3" />
          <div className="flex justify-between text-lg font-semibold mb-3">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="w-full bg-yellow-400 text-black font-medium py-2 rounded-lg disabled:bg-gray-300"
            disabled={Boolean(!selectedTime || isDateSoldOut)}
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceDetails;
