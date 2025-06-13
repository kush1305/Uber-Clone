const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller');
const { query } = require('express-validator');

router.get('/get-coordinates',
    query('address').isString().isLength({min:3}), 
    authMiddleware.authUser,mapController.getCoordinate)
// This code sets up a route to get coordinates based on an address.
// It uses query validation to ensure the address is a string with a minimum length of 3 characters.

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleware.authUser, mapController.getDistanceTime)
// This code sets up a route to get distance and time between two locations.    

router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser, mapController.getAutocompleteSuggestions)
module.exports = router