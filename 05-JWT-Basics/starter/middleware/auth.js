
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = (req, res, next) => {
    //check for authorization header
    const authHeader = req.headers.authorization

    //check whether the json webtoken has been provided
    // check for Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        // don't need to provide error code as it is
        // included in UnauthenticatedError import
        throw new UnauthenticatedError('No token provided')
    }

    //split Bearer from token
    const token = authHeader.split(' ')[1]

    // run verify method
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        // from decoded we get id and username
        req.user = { id, username }
        // pass the user to the next middleware
        next()
    } catch (error) {
        // if unverifiable, send error message
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}


module.exports = authenticationMiddleware