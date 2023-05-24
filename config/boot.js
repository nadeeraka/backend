const PORT = process.env.PORT || 3500
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const connectDB = require('./dbConn')



const bootUp =()=>
{
    if (connectDB()) {
        mongoose.connection.once('open', () => {
            console.log('Connected to MongoDB')
           
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
        })
    }

}


module.exports = bootUp