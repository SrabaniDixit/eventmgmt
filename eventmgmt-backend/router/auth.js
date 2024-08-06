const express = require("express");
const router = express.Router();
require("../db/conn");
//const Library = require("../model/eventSchema");
const Event = require("../model/eventModel");
router.get("/", (req, res) => {
  res.send("hello world from router.js");
});
router.post("/registerEvent", (req, res) => {
  const { Event, AssignedTo, Status, Date, College } = req.body;

  // Check for missing fields
  if (!Event|| !AssignedTo || !Status || !Date || !College ) {
    return res
      .status(422)
      .json({ error: "Please fill in all fields properly" });
  }

  // Check if the event already exists
  Event.findOne({ Event })
    .then((eventExist) => {
      if (eventExist) {
        return res.status(422).json({ error: "Event already exists" });
      }

      // If event doesn't exist, create a new entry
      const event = new Event({
        Event,
        AssignedTo,
        Status,
        Date,
        College,
      });

      // Save the new event entry
      event
        .save()
        .then(() => {
          return res.status(201).json({ message: "Created successfully" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Failed to create the event" });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while registering the event" });
    });
});

router.get("/Allevents", (req, res) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving events" });
    });
});

router.get("/OneEvent/:eventName", (req, res) => {
  const { eventName } = req.params;

  Event.findOne({ Event: eventName })
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the event" });
    });
});

router.put("/Updateevent/:eventName", (req, res) => {
  const { eventName } = req.params; // Get the event name from the URL parameter
  const { Event, AssignedTo, Status, Date, College } = req.body; // Get the new data from the request body

  // Update the event with the matching EventName
  Event.findOneAndUpdate(
    { Event: eventName }, // Search condition
    { Event, AssignedTo, Status, Date, College  }, // New data
    { new: true, runValidators: true } // Options
  )
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event); // Send the updated book data as a response
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the event" });
    });
});

router.delete("/Deleteevent/:eventName", (req, res) => {
  const { eventName } = req.params; // Get the book name from the URL parameter

  // Find and remove the book with the matching BookName
  Event.findOneAndDelete({ Event: eventName })
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({ message: "Event deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the event" });
    });
});

module.exports = router;
