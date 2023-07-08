const { Router } = require("express");
const Message = require("../database/schemas/Message");

const router = Router();

// This code gets all messages that have been sent to the user and returns them to the client.

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find({ receivers: req.user.userId });
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// This code creates a new Message in the database, with the following fields:
// sender: the user who sent the message
// receivers: the users who received the message
// content: the content of the message
// date: the date the message was sent
// time: the time the message was sent
// title: the title of the message

router.post("/", async (req, res) => {
  try {
    const { receivers, content, title } = req.body;
    const sender = `${req.user.firstName} ${req.user.lastName}`;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString().slice(0, 5);

    await Message.create({
      sender,
      receivers,
      content,
      date,
      time,
      title,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
