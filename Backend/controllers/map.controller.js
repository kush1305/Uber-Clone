const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({
                errors: [{ msg: 'Address is required', param: 'address', location: 'query' }]
            });
        }

        const coordinates = await mapsService.getAddressCoordinates(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return res.status(500).json({
            error: 'Failed to fetch coordinates',
            details: error.message
        });
    }
}
// This code defines a controller function to get coordinates based on an address.
// It validates the request, checks for errors, and calls a service to fetch the coordinates.

module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { origin, destination } = req.query;
        if (!origin || !destination) {
            return res.status(400).json({
                errors: [
                    { msg: 'Origin is required', param: 'origin', location: 'query' },
                    { msg: 'Destination is required', param: 'destination', location: 'query' }
                ]
            });
        }

        const distanceTime = await mapsService.getDistanceTime(origin, destination);
        return res.status(200).json(distanceTime);
    } catch (error) {
        console.error('Error fetching distance and time:', error);
        return res.status(500).json({
            error: 'Failed to fetch distance and time',
            details: error.message
        });
    }
}

module.exports.getAutocompleteSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { input } = req.query;
        if (!input) {
            return res.status(400).json({
                errors: [{ msg: 'Input is required', param: 'input', location: 'query' }]
            });
        }

        const suggestions = await mapsService.getAutocompleteSuggestions(input);
        return res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return res.status(500).json({
            error: 'Failed to fetch suggestions',
            details: error.message
        });
    }
}