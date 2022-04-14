


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const AuthRoute = require('./Routes/auth');




mongoose.connect("mongodb+srv://atul14:gokuatul@atulweb14.ach6f.mongodb.net/AtulBank?authSource=admin&replicaSet=atlas-du8gx6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
    useCreateIndex: true,
    poolSize: 10,
});
const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err)
})
db.once('open', () => {
    console.log("DB established")
})

const app = express();


const PORT = process.env.port || 5000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/api', AuthRoute);
