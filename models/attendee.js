const mongoose = require("mongoose");

const attendeeSchema = {
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
};

const Attendee = mongoose.model("attendees", attendeeSchema);

module.exports = Attendee;
