const express = require("express");
const router = express.Router();

const Createuser = require('../Controller/Createuser')
const accountController = require('../Controller/accountController')
const TransactionController = require('../Controller/TransactionController');

const cron= require("node-cron");
const SIPController= require('../Controller/SIPController');

router.post('/register', Createuser.register);
router.post('/login', Createuser.login);
router.post('/getaccount', accountController.getAccount); 
router.get('/:id', accountController.getAccount); 
router.post('/create', accountController.create); // create account
router.post('/createTransaction', TransactionController.create);
router.post('/SIPinfo', SIPController.create);


module.exports = router;