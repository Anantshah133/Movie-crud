const mongoose = require("mongoose");
const { mongoURL } = require("./src/config/config");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURL);
        console.log(`Mongodb connection successful : ${conn.connection.host}`.green);
    } catch (error) {
        console.log(`Mongodb connection failed - ${error}`);
    }
};

module.exports = connectDB;