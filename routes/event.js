const express = require("express");

const router = express.Router();

const eventController = require("../controllers/event.js");

router.post("/create", eventController.createEvent);
router.get("/list", eventController.getEvent);
router.post("/join", eventController.joinEvent);

module.exports = router;
