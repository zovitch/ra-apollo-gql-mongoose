const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgCyan.bold);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
