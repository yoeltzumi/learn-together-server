const { Router } = require("express");

const LessonSchedule = require("../database/schemas/LessonSchedule");
const { teacherAuthorization } = require("../middlewares/authorization");
const { getCurrentLessons } = require("../utils/lessons");

const router = Router();

router.post("/", teacherAuthorization, async (req, res) => {
  try {
    const schedule = req.body;
    await LessonSchedule.create(schedule);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const id = req.user.userId;
    const lessons = await LessonSchedule.find({
      students: { $in: [id] },
    }).exec();
    res.status(200).send(lessons);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/current", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await getCurrentLessons(req.user.userId, req.user.role === "teacher")
      );
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
