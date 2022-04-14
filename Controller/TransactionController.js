const Account = require('../Models/account');
const Transaction = require('../Models/transaction');
const async = require('async');
const mongoose = require('mongoose');



// create a transaction
exports.create = async function (req, res) {
  const session =  await mongoose.startSession();
  session.startTransaction();
  try {
    // const target = await Account.findOne({AccountNo: req.body.targetAccountNo}).session(session);
    // const sender = await Account.findById(req.body.sourceAccountId).session(session);
    console.log("TRANSACTION DETAILS:   ", req.body)
    const transaction = new Transaction({
      sourceAccountId: req.body.sourceAccountId,
      targetAccountId: req.body.targetAccountId,
      amount: req.body.amount
    });
    // sender.currentBal = sender.currentBal - transaction.amount;
    // target.currentBal = target.currentBal + transaction.amount;
    await transaction.save();
    // await sender.save();
    // await target.save();
    await session.commitTransaction();
    return res.send("transfer complete");
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "transaction unsuccessfull. plzz check account no. again" });
  } finally {
    session.endSession();
  }
}



// exports.create = function (req, res) {
//   const transaction = new Transaction({
//           sourceAccountId: req.body.sourceAccountId,
//           targetAccountId: req.body.targetAccountId,       //THIS CODE WILL ALSO WORK
//           amount: req.body.amount
//         });
//   transaction.save(function (err) {
//     if (err) {
//       res.status(500)
//         .json({
//           error: "Problem sending transaction. Check account plzzz"
//         });
//     } else {
//       res.send("Transaction completed");
//     }
//   })
// }