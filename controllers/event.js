const Event = require("../models/event.js");
const Attendee = require("../models/attendee.js");

const createEvent = async (req, res) => {
  const eventData = req.body;
  eventData.date = Date.now();
  //   console.log(eventData);

  const event = new Event(eventData);
  await event.save();

  res.json({
    success: true,
    message: "Event Created Successfully",
  });
};

const getEvent = async (req, res) => {
  const params = req.query;
  //   console.log(params);
  const queryObj = {
    name: {
      $regex: new RegExp(params.searchKey),
      $options: "i", //case insensitive
    },
  };

  const events = await Event.find(queryObj);
  res.json({
    success: true,
    result: events,
  });
};

const joinEvent = async (req, res) => {
  // console.log(req.body);
  // console.log(req.user);

  const alreadyJoined = await Attendee.findOne({
    eventId: req.body.eventId,
    userId: req.user._id,
  });
  // console.log(alreadyJoined);// gives the obj if find

  if (alreadyJoined) {
    return res.status(400).json({
      success: false,
      message: "User is Already Joined this event",
    });
  }

  const attendee = new Attendee({
    eventId: req.body.eventId,
    userId: req.user._id,
  });
  await attendee.save();

  res.json({
    seccess: true,
  });
};

module.exports = {
  createEvent,
  getEvent,
  joinEvent,
};
