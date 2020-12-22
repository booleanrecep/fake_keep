const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get("/", async (req, res) => {
  try {

    const notes = await Note.find({});
    res.send({ notes });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    
    const note = await Note.create({
      _id:req.body._id,
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
    });
    res.send({ note });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const noteRemoved = await Note.findByIdAndRemove(req.params.id);
    res.send({ message: "The note was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});
module.exports = router;
