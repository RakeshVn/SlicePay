const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    symbol: {
        type: String,
    },
    open: {
        type: Number,
    },
    close: {
        type: Number,
    },
    low: {
        type: Number,
    },
    high: {
        type: Number,
    },
    volume: {
        type: Number,
    },
}, {
        versionKey: false
    });


module.exports = mongoose.model('stockData', stockSchema);
