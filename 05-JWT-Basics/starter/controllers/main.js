// check username, passoword in post(login) request
// if not send error message, if correct create new JWT
// send back to front-end

// setup authentication so only the uest with JWT can access the dashboard

const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const login = async (req, res) => {
    const { username, password } = req.body
    
// mongoose validation
// Joi
// check if in the controller

if (!username || !password){
    throw new BadRequestError('Please provide email and password')
}

// just for demo, normally provided by DB!
const id = new Date().getDate()

// try to keep payload small, better experience for user
// just for demo, in prouction *use long, complex and unguessable string value*
const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d',})

    res.status(200).json({msg: 'user created', token})
}

// dashboard route
const dashboard = async (req, res) => {
    console.log(req.user)

    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({
        msg: `Hello, ${req.user.username}`, 
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
}

module.exports = {
    login,
    dashboard,
}