const express = require('express');
const router = express.Router();   
const {body, query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create', 
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Pickup location must be a string'),
    body('destination').isString().isLength({min:3}).withMessage('Destination location must be a string'),
    body('vehicleType').isString().isIn(['auto', 'moto', 'car']).withMessage('Invalid vehicle type'),
    rideController.createRide
);

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Pickup location must be a string'),
    query('destination').isString().isLength({min:3}).withMessage('Destination location must be a string'),
    rideController.getFare
);


router.post(
  '/confirm',
  authMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride id'),
  rideController.confirmRide
);


router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid Message'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

module.exports = router