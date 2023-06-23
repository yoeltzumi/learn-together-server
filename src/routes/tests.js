const { Router } = require("express");

const Test = require("../database/schemas/Test");
const { teacherAuthorization } = require("../middlewares/authorization");

const router = Router();

router.post("/", teacherAuthorization, async (req, res) => {
  try {
    const { subject, startDate, endDate, moed, students } = req.body;
    // todo check date

    await Test.create({ subject, startDate, endDate, moed, students });
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const id = req.user.userId;
    const tests = await Test.find({ students: { $in: [id] } }).exec();
    res.status(200).send(tests);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
