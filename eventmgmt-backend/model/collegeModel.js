const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  CollegeName: {
    type: String,
    require: true,
  },
  Address: {
    type: String,
    require: true,
  },
  Phone: {
    type: String,
    require: true,
  },
});

const College = mongoose.model("COLLEGE", collegeSchema);
module.exports = College;
