const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const atlasUri = 'mongodb+srv://marcussalopaso1:zedmain1525@cluster0.m8fd2iw.mongodb.net/Water';

mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB Atlas (acc)");
    })
    .catch((e) => {
        console.error("Error connecting to MongoDB Atlas:", e);
    });

const mySchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    Data: {
        type: Object,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },
    ContactNum: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
        required: true,
    },
    Destination: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
    DeliverGuy: {
        type: String,
        required: false,
    },
    isCancelled: {
        type: Boolean,
        required: true,
    },
    Uid: {
        type: String,
        required: true,
    },
});

const ACCcollection = mongoose.model('CheckedOut', mySchema);

module.exports = ACCcollection;
