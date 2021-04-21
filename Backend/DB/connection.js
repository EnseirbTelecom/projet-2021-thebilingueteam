const mongoose = require('mongoose');

const uri ='mongodb+srv://Timtim:'+ process.env.MONGO_ATLAS_PW +'!@inpgram.vdanf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async() => {
    await mongoose.connect(uri,
    {useUnifiedTopology: true,
    useNewUrlParser: true })
    .then((result) => console.log('DB connected!...'))
    .catch((err) => console.log(err));
}

module.exports = connectDB;