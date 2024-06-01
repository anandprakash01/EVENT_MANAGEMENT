const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const eventRoutes = require("./routes/event.js");
const userRoutes = require("./routes/user.js");

const authMiddleware = require("./middleware/auth.js");

const app = express();

const portNo = 5000;

app.use(express.json());

app.use("/api/v1/event", authMiddleware, eventRoutes);
app.use("/api/v1/user", userRoutes);

const connectDB = async () => {
  //   await mongoose.connect("mongodb://localhost/event_management");
  await mongoose.connect(
    "mongodb+srv://anandprakash:U02V9wbhn0RVpGfp@cluster0.kwzerw3.mongodb.net/"
  );
}; //127.0.0.1

connectDB()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log("Error while connecting MongoDB", err);
  });

app.listen(portNo, () => {
  console.log("Server is up and running at:", portNo);
});
