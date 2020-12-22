const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  _id:String,
  title: String,
  description: String,
  time:String,
  position: String,
  color:String,
});

module.exports = mongoose.model("notes",NoteSchema)
