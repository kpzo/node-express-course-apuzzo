const mongoose = require('mongoose')
const uri = process.env.MONGO_URI;


const connectDB = async (url) => {
    return await mongoose.connect(url)
}

module.exports = connectDB