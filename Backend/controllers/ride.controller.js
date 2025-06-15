const rideService = require('../services/ride.services');
const { validationResult } = require('express-validator');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userId, pickup, destination, vehicleType } = req.body;
        if (!pickup || !destination || !vehicleType) {
            return res.status(400).json({
                errors: [
                    { msg: 'User ID, pickup, destination, and vehicle type are required', param: 'body', location: 'body' }
                ]
            });
        }

        const ride = await rideService.createRide({ user:req.user._id, pickup, destination, vehicleType });
        return res.status(201).json(ride);
    } catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({
            error: 'Failed to create ride',
            details: error.message
        });
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination } = req.query;
        if (!pickup || !destination) {
            return res.status(400).json({
                errors: [
                    { msg: 'Pickup and destination are required', param: 'body', location: 'body' }
                ]
            });
        }

        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.error('Error fetching fare:', error);
        return res.status(500).json({
            error: 'Failed to fetch fare',
            details: error.message
        });
    }
}