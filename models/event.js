const mongoose = require("mongoose");

const eventSchema = {
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
};

const Event = mongoose.model("events", eventSchema); //mongoDB will automatically add s at the last of collection

module.exports = Event;
