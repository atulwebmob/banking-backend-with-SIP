const mongoose = require("mongoose");
const Schema = mongoose.Schema
const cron= require("node-cron");


const sipSchema = new Schema({
    AccountNo : {
        type : Schema.Types.ObjectId,
        ref : 'account',
        required : true,
        unique : true
    }
}, { timestamp: true })

module.exports = mongoose.model('SIP', sipSchema);