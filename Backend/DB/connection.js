const mongoose = require('mongoose');

const url ='mongodb+srv://Timtim:cacahuetes22!@inpgram.vdanf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const connectDB = async() => {
    await mongoose.connect(url,
    {useUnifiedTopology: true,
    useNewUrlParser: true });
    console.log('db connected!...');
}

module.exports = connectDB;