const user = require('../Models/user')
const Account = require('../Models/account')
const jwt = require('jsonwebtoken')
const async = require('async');
const Transaction = require('../Models/transaction');

//create new account
exports.create = (req, res, next) => {
    const account = new  Account({
       
        user: req.body.user,
        AccountNo: req.body.AccountNo,
        currentBal: req.body.currentBal
    });
    account.save(function (err){
        if(err){
            res.status(500)
            .json({
                error: "problem in creating account. Check acc no. is unique"
            });
        }else{
            res.send("Account Created")
        }
    })
    
}

//get account data
exports.getAccount = (req, res, next) => {
    async.parallel({
      account: function (callback) {
        Account.findById(req.params.id, callback);
      },
      transactions: function (callback) {
        Transaction.find({
          $or: [
            { sourceAccountId: req.params.id },
            { targetAccountId: req.params.id }
          ]
        }, callback).populate('targetAccountId').populate('sourceAccountId');
      }
    }, function (err, results) {
      if (err) {
        res.status(500)
          .json({
            error: "Problem getting transaction data. Please try again."
          })
      } else {
        res.json({
          account: results.account,
          transactions: results.transactions
        });
      }
    })
  }