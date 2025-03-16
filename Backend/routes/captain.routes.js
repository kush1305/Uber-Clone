const express = require('express')
const router =  express.Router();
const { body } = require("express-validator")
const captainController = require('../controllers/captain.controllers')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register' ,[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name at least 3 chracters long'),
    body('password').isLength({min:6}).withMessage('password 6 chracters'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 characters'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 chracters'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must  be atleast 1'),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('Invalid'),
],
captainController.registerCaptain)


router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be 6 characters long'),
    ],
    captainController.loginCaptain
)

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)

module.exports = router;