const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    priceNative: String,
    priceUsd: String,
    priceChange: {
        type: Object,
        default: {}
    },
    volume: {
        type: Object,
        default: {}
    }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
