const rideModel = require("../models/ride.model");
const { validationResult } = require("express-validator");
const mapsService = require("../services/maps.service");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../socket");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required to calculate fare");
  }
  // Example fare calculation logic
  const distanceTime = await mapsService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    moto: 20,
    car: 50,
  };

  const perKmRate = {
    auto: 10,
    moto: 8,
    car: 15,
  };

  const perMinuteRate = {
    auto: 2,
    moto: 1.5,
    car: 3,
  };

  const fare = {
    auto:
      baseFare.auto +
      (distanceTime.distance.value / 1000) * perKmRate.auto +
      (distanceTime.duration.value / 60) * perMinuteRate.auto,
    moto:
      baseFare.moto +
      (distanceTime.distance.value / 1000) * perKmRate.moto +
      (distanceTime.duration.value / 60) * perMinuteRate.moto,
    car:
      baseFare.car +
      (distanceTime.distance.value / 1000) * perKmRate.car +
      (distanceTime.duration.value / 60) * perMinuteRate.car,
  };

  // Round to 2 decimal places
  const price = {
    auto: fare.auto.toFixed(2),
    moto: fare.moto.toFixed(2),
    car: fare.car.toFixed(2),
  };

  return price;
}

module.exports.getFare = getFare;

function getOtp(num) {
  return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and otp is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("otp is invalid");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  if (ride.user && ride.user.socketId) {
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride,
    });
  } else {
    console.warn("User socketId is missing. Skipping socket event.");
  }

  return ride;
};

module.exports.endRide = async ({rideId,captain}) => {

  if(!rideId){
    throw new Error("Ride Id is required");
    
  }

  const ride = await rideModel.findOne({
    _id:rideId,
    captain:captain._id
  }).populate('user').populate('captain').select('+otp');

  if(!ride){
    throw new Error("Ride not found");
    
  }

  if(ride.status !== 'ongoing'){
    throw new Error("Ride not ongoing");
    
  }

  await rideModel.findOneAndUpdate({
    _id:rideId
  },{
    status:'completed'
  })

  return ride;
  
}
