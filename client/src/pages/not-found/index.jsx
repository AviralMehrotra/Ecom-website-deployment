import { useEffect, useState } from "react";
import axios from "axios";

function NotFound() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchRandomPetImage();
  }, []);

  const fetchRandomPetImage = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      setImageUrl(response.data[0].url);
    } catch (error) {
      console.error("Error fetching the pet image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <a href="/" className="text-lg font-medium text-blue-900 hover:underline">
        Go to Home
      </a>
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">
        Oops! This page doesn't exist.
      </p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Random Pet"
          className="w-[400px] lg:w-[400px] md:w-[300px] sm:w-[200px] rounded-lg shadow-lg mb-8"
        />
      )}
    </div>
  );
}

export default NotFound;
