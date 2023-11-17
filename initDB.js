const mongoose = require("mongoose");
module.exports = () => {
  const db_URL = "{YOUR_MONGODB_DB_URL}";
  mongoose
    .connect(db_URL)
    .then(() => {
      console.log("mongodb connected local host");
    })
    .catch((err) => console.log(err.message));
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db.");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected.");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close().then(() => {
      console.log("Mongoose connection is disconnected due to app terminated");
      process.exit(0);
    });
  });
};
