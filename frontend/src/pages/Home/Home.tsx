import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Experience {
  _id?: string;      // For MongoDB ObjectId
  id: number;        // Custom ID field
  title: string;
  location: string;
  imageUrl: string;
  price: number;
}

const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/experiences", {
        credentials: "include",
      });

      console.log("Response status:", res.status);

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Received HTML instead of JSON:", text);
        throw new Error("Server returned HTML instead of JSON");
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched experiences:", data);

      setExperiences(data.experiences || data || []);
    } catch (err: any) {
      console.error("❌ Fetch error:", err);
      setError("Failed to fetch experiences: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [location]);

  const handleViewDetails = (id: number) => {
    navigate(`/experience/${id}`);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500">
        Loading experiences...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        {error}
      </div>
    );
  }
  return (
    <section className="max-w-7xl mx-auto p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={exp.imageUrl}
              alt={exp.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  {exp.title}
                </h3>
                <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                  {exp.location}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Curated small-group experience. Certified guide. Safety first
                with gear included.
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-semibold text-gray-800">
                  From ₹{exp.price}
                </span>
                <button
                  onClick={() => handleViewDetails(exp.id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-3 py-2 rounded-lg transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
