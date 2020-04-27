const mongoose = require('mongoose');
const FinanceSchema = new mongoose.Schema({
  USD:{
    name: String,
    buy: String,
    sell: String,
    variation: String,
  },
  EUR:{
    name: String,
    buy: String,
    sell: String,
    variation: String,
  },
  BTC:{
    name: String,
    buy: String,
    sell: String,
    variation: String,
  },
  createdAt: {type:Date, default: Date.now},
});

module.exports = mongoose.model('Finance', FinanceSchema);
