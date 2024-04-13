const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const atlasUri = 'mongodb+srv://marcussalopaso1:zedmain1525@cluster0.m8fd2iw.mongodb.net/Water';

mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB Atlas (Cart)");
    })
    .catch((e) => {
        console.error("Error connecting to MongoDB Atlas:", e);
    });

const mySchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    Stars: {
        type: String,
        required: false,
    },
    Message: {
        type: String,
        required: false,
    },
    Date: {
        type: String,
        required: true,
    },
    Uid: {
        type: String,
        required: true,
    },
    
});

const userInfo = mongoose.model('Rating', mySchema);

module.exports = userInfo;
