require("dotenv").config();
const express = require("express");
const server = express();
const port = process.env.PORT || 5000;
const Lessons = require("./data/models/dbHelpers");

server.use(express.json());

server.get("/api/lessons", (req, res) => {
  Lessons.find()
    .then((lessons) => {
      res.status(200).json(lessons);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.get("/api/lessons/:id", (req, res) => {
  Lessons.findById(req.params.id)
    .then((lesson) => {
      res.status(200).json(lesson);
    })
    .catch((err) => console.log(err));
});
server.post("/api/lessons", (req, res) => {
  Lessons.add(req.body)
    .then((newLesson) => res.status(200).json(newLesson))
    .catch((err) => res.status(500).json(err));
});

server.put("/api/lessons/:id", (req, res) => {
  Lessons.update(req.params.id, req.body).then((lesson) =>
    res.status(200).json(lesson)
  );
});

server.delete("/api/lessons/:id", (req, res) => {
  Lessons.remove(req.params.id)
    .then((deletedLesson) => res.status(200).json(deletedLesson))
    .catch((err) => res.status(500).json(err));
});

server.listen(port, () => {
  console.log(`server listening on port:  ${port}`);
});

module.exports = server;
