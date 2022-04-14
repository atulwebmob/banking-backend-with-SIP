const user = require('../Models/user')
const Account = require('../Models/account')
const jwt = require('jsonwebtoken')
const async = require('async');
const Transaction = require('../Models/transaction');
const SIP = require('../Models/SIP');
const cron = require("node-cron");


exports.create = (req, res, next) => {
    const sip = new SIP({

        AccountNo: req.body.AccountNo

    });
    sip.save(function (err) {
        if (err) {
            res.status(500)
                .json({
                    error: "problem in SIP deduction"
                });
        } else {
            console.log('SIP is going to deduct');
            const task = cron.schedule('42 13 5-13 January-December *', () => {3
                const d = new Date();
                console.log('on this day of month:', d);
            });
            console.log("SIP deducted");
            task.start();

            res.send("SIP DONE")
        }
    })

}


