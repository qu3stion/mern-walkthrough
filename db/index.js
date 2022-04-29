// import mongoose
const mongoose = require('mongoose')

//creating database from code
let MONGODB_URI = process.env.PROD_MONGODB || process.env.MONGODB_URI || 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.z7zi6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//mongoose connect function
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to MongoDB')
}).catch(e => {
    console.error('Connection error', e.message)
})

const db = mongoose.connection
module.exports = db