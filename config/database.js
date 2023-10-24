const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(process.env.DB_URI)
  console.log("connected to DB successfully")
};
