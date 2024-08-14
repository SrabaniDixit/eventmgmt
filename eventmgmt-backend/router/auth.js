const express = require("express");
const router = express.Router();
require("../db/conn");
//const Library = require("../model/eventSchema");
const Event = require("../model/eventModel");
const College = require("../model/collegeModel");
router.get("/", (req, res) => {
  res.send("hello world from router.js");
});
router.post("/registerEvent", (req, res) => {
  const { Event: eventName, AssignedTo, Status, Date, College } = req.body;

  // Check for missing fields
  if (!eventName || !AssignedTo || !Status || !Date || !College) {
    return res
      .status(422)
      .json({ error: "Please fill in all fields properly" });
  }

  // Check if the event already exists
  Event.findOne({ Event: eventName })
    .then((eventExist) => {
      if (eventExist) {
        return res.status(422).json({ error: "Event already exists" });
      }

      // If event doesn't exist, create a new entry
      const newEvent = new Event({
        Event: eventName,
        AssignedTo,
        Status,
        Date,
        College,
      });

      // Save the new event entry
      newEvent
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
      res.status(500).json({ error: "An error occurred while registering the event" });
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
  const { Event: newEventName, AssignedTo, Status, Date, College } = req.body; // Get the new data from the request body

  // Update the event with the matching eventName
  Event.findOneAndUpdate(
    { Event: eventName }, // Search condition
    { Event: newEventName, AssignedTo, Status, Date, College }, // New data
    { new: true, runValidators: true } // Options
  )
    .then((event) => {
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event); // Send the updated event data as a response
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the event" });
    });
});

router.delete("/Deleteevent/:eventName", (req, res) => {
  const { eventName } = req.params; // Get the event name from the URL parameter

  // Find and remove the event with the matching EventName
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
router.post("/registerCollege", (req, res) => {
  const { CollegeName, Address, Phone } = req.body;

  // Check for missing fields
  if (!CollegeName || !Address || !Phone) {
    return res.status(422).json({ error: "Please fill in all fields properly" });
  }

  // Check if the college already exists
  College.findOne({ CollegeName })
    .then((collegeExist) => {
      if (collegeExist) {
        return res.status(422).json({ error: "College already exists" });
      }

      // If college doesn't exist, create a new entry
      const newCollege = new College({
        CollegeName,
        Address,
        Phone,
      });

      // Save the new college entry
      newCollege
        .save()
        .then(() => {
          return res.status(201).json({ message: "College created successfully" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Failed to create the college" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred while registering the college" });
    });
});

router.get("/Allcolleges", (req, res) => {
  College.find()
    .then((colleges) => res.json(colleges))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred while retrieving colleges" });
    });
});

router.get("/OneCollege/:collegeName", (req, res) => {
  const { collegeName } = req.params;

  College.findOne({ CollegeName: collegeName })
    .then((college) => {
      if (!college) {
        return res.status(404).json({ error: "College not found" });
      }
      res.json(college);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred while retrieving the college" });
    });
});

router.put('/Updatecollege/:collegeName', async (req, res) => {
  try {
    const originalCollegeName = req.params.collegeName;
    const updatedCollegeData = req.body;

    const updatedCollege = await College.findOneAndUpdate(
      { CollegeName: originalCollegeName },
      updatedCollegeData,
      { new: true } // Return the updated document
    );

    if (!updatedCollege) {
      return res.status(404).send('College not found');
    }

    res.send(updatedCollege);
  } catch (error) {
    res.status(500).send('Error updating college: ' + error.message);
  }
});

router.delete("/Deletecollege/:collegeName", (req, res) => {
  const { collegeName } = req.params;

  College.findOneAndDelete({ CollegeName: collegeName })
    .then((college) => {
      if (!college) {
        return res.status(404).json({ error: "College not found" });
      }
      res.json({ message: "College deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "An error occurred while deleting the college" });
    });
});

module.exports = router;
