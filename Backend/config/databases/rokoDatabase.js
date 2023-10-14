const mongoose = require("mongoose");

  // Define connection URLs
  const db1URL = `${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.k5rrirq.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
  const db2URL = `${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.yqc9oz8.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
  
  // Create connections
  const userDB = mongoose.createConnection(db1URL, { useNewUrlParser: true, useUnifiedTopology: true });
  const paymentDB = mongoose.createConnection(db2URL, { useNewUrlParser: true, useUnifiedTopology: true });

  module.exports = {userDB, paymentDB};
