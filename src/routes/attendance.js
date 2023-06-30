const { Router } = require("express");

const { teacherAuthorization } = require("../middlewares/authorization");
const {
  getCurrentLessons,
  getMySchedule,
  getStringDay,
} = require("../utils/lessons");
const LessonSchedule = require("../database/schemas/LessonSchedule");
const { Lesson } = require("../database/schemas/LessonSchedule");

const router = Router();

router.post("/open", teacherAuthorization, async (req, res) => {
  try {
    const userId = req.user.userId;

    const schedule = await getMySchedule(userId, true);
    const currentLessons = await getCurrentLessons(userId, true, schedule);
    for (let index = 0; index < schedule[0][getStringDay()].length; index++) {
      const lesson = schedule[0][getStringDay()][index];
      if (lesson.id === currentLessons[0].id);
      {
        schedule[0][getStringDay()][index].activatedForAttendence = true;
      }
    }

    console.log(
      await LessonSchedule.updateOne({ _id: schedule[0].id }, schedule[0])
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  // todo continue
});

module.exports = router;
