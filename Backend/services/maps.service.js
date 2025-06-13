const axios = require('axios');
module.exports.getAddressCoordinates = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to find coordinates for the given address');
        }   
    }
    catch (error) {
        console.error('Error fetching coordinates:', error);
        throw new Error('Failed to fetch coordinates');
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    
    try {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;             
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'OK') {
                return {
                    distance: element.distance,
                    duration: element.duration
                };
            } else {
                throw new Error('Unable to find distance and time for the given locations');
            }
        } else {
            throw new Error('Failed to fetch distance and time');
        }
    }
    catch (error) {
        console.error('Error fetching distance and time:', error);
        throw new Error('Failed to fetch distance and time');
    }
}
// This code defines a service to get distance and time between two locations using the Google Maps Distance Matrix API.

module.exports.getAutocompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input is required for autocomplete suggestions');
    }

    try {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Failed to fetch autocomplete suggestions');
        }
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        throw new Error('Failed to fetch autocomplete suggestions');
    }
}