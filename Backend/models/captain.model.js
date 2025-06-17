const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

const captainSchema = new mongoose.Schema({

    fullname:{
        firstname: {
            type: String,
            required: true,
            minlength:[3,'Firstname must be at least 3 characters long']
        },
        lastname:{
            type:String,
            
            minlength:[3, 'Lastname must be at least 3 character long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email']
    }
    ,
    password:{
        type: String,
        required: true,
        select: false
    },

    
    status:{

        type: String,
        enum: ['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be atleast 3 charcter long']
        },
        plate:{
            type: String,
            required: true,
            minlength:[3, 'Plate must be at least 3 cahracter long']
        },
        capacity:{
            type:Number,
            required: true,
            min: [ 1, 'Capacity must be atleast 1']
        },
        vehicleType:{
            type: String,
            required: true,
            enum:['car','bike','auto']
        }
    },
    location:{
        ltd:{
            type:Number
        },
        lng :{
            type:Number
        }
    },
    socketId:{
        type: String
    }


})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET,{expiresIn: '24h'})
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);    
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10)
}

const captainModel = mongoose.model('captain',captainSchema);

module.exports = captainModel;

