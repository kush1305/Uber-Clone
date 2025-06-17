const rideService = require("../services/ride.services");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
    if (!pickupCoordinates || pickupCoordinates.lat == null) {
      return res.status(400).json({ error: "Invalid pickup coordinates" });
    }

    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      2
    );

    // notify captains before response
    const rideWithUser = await rideModel.findById(ride._id).populate("user");
    captainsInRadius.forEach((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });

    res.status(201).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

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
          {
            msg: "Pickup and destination are required",
            param: "body",
            location: "body",
          },
        ],
      });
    }

    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    console.error("Error fetching fare:", error);
    return res.status(500).json({
      error: "Failed to fetch fare",
      details: error.message,
    });
  }
};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain:req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({
            rideId,
            otp,
            captain: req.captain
        });

        if (ride?.user?.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-started',
                data: ride
            });
        }

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports.endRide = async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {

      const ride = await rideService.endRide({rideId,captain: req.captain})

      sendMessageToSocketId(ride.user.socketId,{
        event: 'ride-ended',
        data:ride
      })

      return res.status(200).json(ride)
      
    } catch (error) {

      return res.status(500).json({message: error.message})
      
    }

}
