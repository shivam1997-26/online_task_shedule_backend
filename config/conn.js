const mongoose = require('mongoose')


const dbConn = async () => {
    try {
        const data = await mongoose.connect(process.env.MONGO_URL)
        console.log('connected')
    } catch (err) {
        console.log(err)
    }
}

module.exports = dbConn;