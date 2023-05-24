const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500


const connectDB = async (err=false) => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.log(`possible database error`)
        console.log(err)
        return false
    }
}


module.exports = connectDB