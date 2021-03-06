/*
transaction.js
Model
Reference number: 2.12
This model represents a transaction, that contains a debt paid from one user
to another
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Counter = require('./counter');

var transactionSchema = new Schema({
    id: Number,
    title: String,
    userFromId: String,
    userToId: String,
    amount: Number,
    groupId: Number
});

transactionSchema.pre('save', function(next) {
    var transaction = this;
    Counter.findOneAndUpdate({_id: 'transactionId'}, {$inc: { seq: 1} }, { upsert: true, new: true }, function(err, counter)   {
        if(err) {
            return next(err);
        }
        transaction.id = counter.seq;
        next();
    });
});

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
