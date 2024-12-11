import axios from "axios";

const fetchCoordinatesFromAddress = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${process.env.API_KEY_GEO}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK" && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      console.error("Geocoding API error:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return null;
  }
};

export { fetchCoordinatesFromAddress };
