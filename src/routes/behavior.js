const { Router } = require("express");
const Behavior = require("../database/schemas/Behavior");
const { teacherAuthorization } = require("../middlewares/authorization");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const behaviors = await Behavior.find({ student: req.user.userId });
    res.status(200).json(behaviors);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/", teacherAuthorization, async (req, res) => {
  try {
    const { type, date, student, subject, lessonNumber } = req.body;
    const behavior = Behavior.create({
      type,
      date,
      student,
      subject,
      lessonNumber,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
