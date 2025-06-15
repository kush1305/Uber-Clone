const rideModel = require('../models/ride.model');
const { validationResult } = require('express-validator');
const mapsService = require('../services/maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required to calculate fare');
    }
    // Example fare calculation logic
    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        moto: 20,
        car: 50   
    }

    const perKmRate = {
        auto: 10,
        moto: 8,
        car: 15
    }

    const perMinuteRate = {
        auto: 2,
        moto: 1.5,
        car: 3
    }

    const fare = {
        auto: baseFare.auto + (distanceTime.distance.value/1000 ) * perKmRate.auto + (distanceTime.duration.value/60 ) * perMinuteRate.auto,
        moto: baseFare.moto + (distanceTime.distance.value/1000 ) * perKmRate.moto + (distanceTime.duration.value/60 ) * perMinuteRate.moto,
        car: baseFare.car + (distanceTime.distance.value/1000 ) * perKmRate.car + (distanceTime.duration.value/60 ) * perMinuteRate.car
    }

    // Round to 2 decimal places
    const price = {
        auto: fare.auto.toFixed(2),
        moto: fare.moto.toFixed(2),
        car: fare.car.toFixed(2)
    };

    return price;
}

module.exports.getFare = getFare;

function getOtp(num){
    return crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
}


module.exports.createRide = async ({user,pickup,destination,vehicleType}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination, and vehicle type are required to create a ride');
    }

    

    const fare = await getFare(pickup, destination);
    console.log(fare)
    const ride = new rideModel({
        user: user._id,
        pickup,
        destination,
        otp: getOtp(4),
        fare: fare[vehicleType]
        
    });

    return ride
}