require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500
const router = require('./router/root')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')


connectDB()


app.use(cors(corsOptions))

app.use(logger)
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', router)

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})


app.use(errorHandler)
// console.log(process.env.NODE_ENV)
// try {
//     mongoose.connection.once('open',app.listen(PORT,() => console.log(`Server running on port ${PORT}`)))
// } catch (error) {
//     console.log(error)
// }

// try {
//      mongoose.connect(process.env.DATABASE_URI)
// } catch (err) {
//     console.log(err)
// }
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
   
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

//  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))