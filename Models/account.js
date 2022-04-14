const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required : true
    },
    AccountNo : {
        type : Number,
        required : true,
        unique : true
    },
    currentBal:{
        type: Number
    }
});
module.exports = mongoose.model('Account', AccountSchema);