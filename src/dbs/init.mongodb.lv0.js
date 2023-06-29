'use strict'

const mongoose = require("mongoose");

const connectStr = 'mongodb://localhost:27017/shop';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4 // Use IPv4, skip trying IPv6
}
mongoose.connect(connectStr, options).then(_ => {
  console.log("connect mongo successed");
}).catch(err => console.log("Err connect ", err));

// dev
if (1 === 0) {
  mongoose.set('debug', true);
  mongoose.set('debug', {color:true});
}

module.exports = mongoose;