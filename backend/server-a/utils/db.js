require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
        };
   
        const connection = await mongoose.connect('mongodb://mongo:27017/SandwichHouse', options ); 
        if (connection){
            console.log('Connected to MongoDB');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    }

module.exports = { connectDB };
