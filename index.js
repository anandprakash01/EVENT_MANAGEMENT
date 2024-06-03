const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const eventRoutes = require("./routes/event.js");
const userRoutes = require("./routes/user.js");

const authMiddleware = require("./middleware/auth.js");

const app = express();

// const port = 5000;
const port = process.env.PORT || 10000;

app.use(express.json());

app.use("/api/v1/event", authMiddleware, eventRoutes);
app.use("/api/v1/user", userRoutes);

const connectDB = async () => {
  //localhost:27017/
  //127.0.0.1:27017/
  await mongoose.connect(process.env.MONGO_URI);
};

connectDB()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log("Error while connecting MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is up and running at:", port);
});
