import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract data from state
  const {
    title = "Unknown Experience",
    imageUrl = "",
    date = "",
    time = "",
    quantity = 1,
    total = 0,
    experienceId = "",
  } = location.state || {};

  const subtotal = total > 59 ? total - 59 : total;
  const taxes = 59;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [agree, setAgree] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // ✅ Fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming you store JWT
        const res = await fetch("https://backkend-h76s.onrender.com/api/user/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setName(data.name || "");
        setEmail(data.email || "");
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const handleConfirm = () => {
    if (!agree) {
      alert("Please agree to the terms before proceeding.");
      return;
    }

    navigate("/confirmation", {
      state: {
        experienceId,
        title,
        imageUrl,
        date,
        time,
        quantity,
        total,
        name,
        email,
      },
    });
  };

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading user info...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
     
      <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Checkout</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Promo code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-black text-white px-4 rounded-lg hover:bg-gray-800">
            Apply
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="w-4 h-4"
          />
          <label className="text-sm text-gray-600">
            I agree to the terms and safety policy
          </label>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}

        <div className="flex justify-between text-gray-700 mb-2">
          <span>Experience</span>
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Date</span>
          <span>{date}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Time</span>
          <span>{time}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Qty</span>
          <span>{quantity}</span>
        </div>

        <hr className="my-2" />
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>Taxes</span>
          <span>₹{taxes}</span>
        </div>

        <hr className="my-2" />
        <div className="flex justify-between text-lg font-semibold text-gray-900 mb-4">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-lg transition"
        >
          Pay and Confirm
        </button>
      </div>
    </div>
  );
};

export default Checkout;
