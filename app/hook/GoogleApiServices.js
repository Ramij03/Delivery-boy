import axios from 'axios';

// Function to calculate distance and time
const calculateDistanceAndTime = async (startLat, startLng, destinationLat, destinationLng, mode = 'bicycling') => {
    const apiKey = "YourApiKey"; // Replace with your API Key
    const baseUrl = "https://maps.gomaps.pro/maps/api/distancematrix/json"; // Correct endpoint

    const ratePerKm = 1;

    // Construct the request URL
    const requestUrl = `${baseUrl}?origins=${startLat},${startLng}&destinations=${destinationLat},${destinationLng}&mode=${mode}&key=${apiKey}`;

    try {
        // Make the request using axios
        const response = await axios.get(requestUrl);

        // Check if the response is OK and contains the needed data
        const data = response.data;
        if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
            const distance = data.rows[0].elements[0].distance.text;
            const duration = data.rows[0].elements[0].duration.text;

            // Calculate cost based on distance
            const distanceInKm = parseFloat(distance.replace(' km', ''));
            const price = distanceInKm * ratePerKm;
            const finalPrice = `$${price.toFixed(2)}`;

            return {
                distance,
                duration,
                finalPrice
            };
        } else {
            console.error("Error calculating distance and duration:", data.status);
            return null;
        }
    } catch (error) {
        console.error("Failed to calculate distance and duration:", error);
        return null;
    }
};

// Function to extract numbers from a string (e.g., from the duration)
const extractNumbers = (inputStr) => {
    if (typeof inputStr !== 'string') {
        return [];
    }
    const matched = inputStr.match(/\d+/g);
    return matched ? matched.map(num => parseInt(num, 10)) : [];
};

// Function to fetch directions (polyline)
const fetchDirections = async (startLat, startLng, destinationLat, destinationLng) => {
    const apiKey = "AlzaSywsTdIIHqCXJoNV3RHOyNi-VwNtGe0q2oc"; // API Key
    const baseUrl = "https://api.gomaps.com/directions"; // Correct endpoint for directions

    try {
        const url = `${baseUrl}?origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}&key=${apiKey}`;

        // Make the request using axios
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === "OK") {
            const encodedPolyline = data.routes[0].overview_polyline.points;
            const coordinates = decodePolyline(encodedPolyline);

            return coordinates;
        } else {
            console.error("Error fetching directions:", data.status);
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch directions:", error);
        return null;
    }
};

// Function to decode encoded polyline to coordinates
const decodePolyline = (encoded) => {
    const points = [];
    let index = 0,
        len = encoded.length;
    let lat = 0,
        lng = 0;

    while (index < len) {
        let shift = 0,
            result = 0;
        let byte;
        do {
            byte = encoded.charCodeAt(index++) - 63; // <-- we use charCodeAt method, not a 'char' property
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
        lat += deltaLat;

        shift = 0;
        result = 0;
        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
        lng += deltaLng;

        points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
};

// Export the functions
export default {
    calculateDistanceAndTime,
    extractNumbers,
    fetchDirections
};
