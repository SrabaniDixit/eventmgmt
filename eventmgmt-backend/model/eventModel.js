const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  Event: {
    type: String,
    require: true,
  },
  AssignedTo: {
    type: String,
    require: true,
  },
  Status: {
    type: String,
    require: true,
  },
  Date: {
    type: String,
    require: true,
  },
  College: {
    type: String,
    require: true,
  },
});

const Event = mongoose.model("EVENT", eventSchema);
module.exports = Event;
