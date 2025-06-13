const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
        default: null
    },
    pickup: {
        type: String,
        required: true,
        
    },
    destination: {
        type: String,
        required: true,
        
    },
    fare: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress','accepted', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        default: null
    },// in seconds
    distance: {
        type: Number,
        default: null
    },// in meters
    paymentID:{
        type: String,
        default: null
    },
    orderID:{
        type: String,
        default: null
    },
    signature:{
        type: String,
        default: null
    }
});

module.exports = mongoose.model('ride', rideSchema);
// This code defines a Mongoose schema for a ride model in a ride-hailing application.
// It includes fields for user, captain, pickup and destination locations, fare, status, timestamps, duration, distance, and payment details.