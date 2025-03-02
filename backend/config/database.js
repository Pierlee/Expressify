const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI)
    .then((con) => {
      console.log(`✅ MongoDB Database connected with HOST: ${con.connection.host}`);
    })
    .catch((error) => {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
      process.exit(1); // Exit the process if connection fails
    });
};

module.exports = connectDatabase;
