const app = require('./app.js')
const db = require('./db')

//establishing port
const PORT = process.env.PORT || 3000

//debug
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))