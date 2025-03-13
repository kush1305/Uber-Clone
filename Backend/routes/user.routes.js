const express= require('express');
const router = express.Router();

const { body } = require('express-validator')
const userController = require('../controllers/user.controllers')
const authMiddleware = require('../middlewares/auth.middleware')



router.post('/register' ,[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name at least 3 chracters long'),
    body('password').isLength({min:6}).withMessage('password 6 chracters')
],
userController.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password')
],
    userController.loginUser
)


router.get('/profile',authMiddleware.authUser, userController.getUserProfile)
router.get('/logout', authMiddleware.authUser,userController.logoutUser)

module.exports = router; 