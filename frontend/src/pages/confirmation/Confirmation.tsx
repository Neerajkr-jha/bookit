import React from "react";
import { useNavigate } from "react-router-dom";

const Confirmation: React.FC = () => {
  const navigate = useNavigate();

  
  const generateRefId = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&$";
    let id = "";
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const refId = generateRefId();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
     
      <div className="bg-green-500 rounded-full p-4 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>


      <h2 className="text-2xl font-semibold mb-2">Booking Confirmed</h2>


      <p className="text-gray-600 mb-6">Ref ID: {refId}</p>

      
      <button
        onClick={() => navigate("/")}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Confirmation;
