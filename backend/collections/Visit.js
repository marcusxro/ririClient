const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const atlasUri = 'mongodb+srv://marcussalopaso1:zedmain1525@cluster0.m8fd2iw.mongodb.net/Water';

mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB Atlas (Timestamp)");
    })
    .catch((e) => {
        console.error("Error connecting to MongoDB Atlas:", e);
    });

const mySchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    Timestamp: { type: Date, default: Date.now },
    Uid: {
        type: String,
        required: true,
    },

});

const Timestamp = mongoose.model('Visit', mySchema);

module.exports = Timestamp;
